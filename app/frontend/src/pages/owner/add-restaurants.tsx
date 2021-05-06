import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { FormError } from 'components/form-error';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import {
  createRestaurant,
  createRestaurantVariables,
} from '__generated__/createRestaurant';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
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
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });
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
