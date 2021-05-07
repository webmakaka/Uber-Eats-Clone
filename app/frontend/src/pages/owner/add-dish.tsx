import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { MY_RESTAURANT_QUERY } from 'pages/owner/my-restaurant';
import { createDish, createDishVariables } from '__generated__/createDish';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IFormProps {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({ mode: 'onChange' });
  const onSubmit = () => {
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });

    history.goBack();
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold txt-2xl mb-3">Add Dish</h4>
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
          className="input"
        />

        <input
          {...register('price', {
            required: 'Price is required',
          })}
          min={0}
          type="number"
          placeholder="Price"
          className="input"
        />
        <input
          {...register('description', {
            required: 'Description Name is required',
          })}
          type="text"
          placeholder="Description"
          className="input"
        />

        <Button loading={loading} canClick={isValid} actionText="Crate Dish" />
      </form>
    </div>
  );
};
