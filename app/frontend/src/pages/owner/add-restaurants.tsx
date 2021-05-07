import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { FormError } from 'components/form-error';
import { MY_RESTAURANTS_QUERY } from 'pages/owner/my-restaurants';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import {
  createRestaurant,
  createRestaurantVariables,
} from '__generated__/createRestaurant';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');

  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });

      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                name,
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                __typename: 'Restaurant',
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push('/');
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: MY_RESTAURANTS_QUERY,
      },
    ],
  });
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, categoryName, address, file } = getValues();
      const actualFile = file[0];
      // const formBody = new FormData();
      // formBody.append('file', actualFile);

      // const { url: coverImg } = await (
      //   await fetch('http://127.0.0.1:4000/uploads/', {
      //     method: 'POST',
      //     body: formBody,
      //   })
      // ).json();

      const coverImg =
        'https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/bbq.png';

      setImageUrl(coverImg);

      createRestaurantMutation({
        variables: {
          input: { name, address, categoryName, coverImg },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register('name', {
            required: 'Name is required',
          })}
          type="text"
          placeholder="Name"
          className="input "
        />
        <input
          {...register('address', {
            required: 'Address is required',
          })}
          type="text"
          placeholder="Address"
          className="input "
        />

        <input
          {...register('categoryName', {
            required: 'Category Name is required',
          })}
          type="text"
          placeholder="Category Name"
          className="input "
        />
        <div>
          <input
            {...register('file', {
              required: true,
            })}
            type="file"
            accept="image/*"
            placeholder="Category Name"
            className="input "
          />
        </div>
        <Button
          loading={uploading}
          canClick={isValid}
          actionText="Create Restaurant"
        ></Button>
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
