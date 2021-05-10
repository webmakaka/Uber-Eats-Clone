import { gql, useQuery } from '@apollo/client';
import { Dish } from 'components/dish';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from 'fragments';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { CreateOrderItemInput } from '__generated__/globalTypes';
import { restaurant, restaurantVariables } from '__generated__/restaurant';

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantProps {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantProps>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        { dishId, options: [option, ...oldItem.options!] },
        ...current,
      ]);
    }
  };
  console.log(orderItems);

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ''} | Nuber Eats</title>
      </Helmet>
      <div
        className="py-48 bg-gray-800 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="w-3/12 py-8 pl-48 bg-white">
          <h4 className="mb-3 text-4xl">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="mb-2 text-sm font-light">
            {data?.restaurant.restaurant?.category?.name}
          </h5>

          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>

      <div className="container flex flex-col items-end mt-20 pb-22">
        <button className="px-10 btn" onClick={triggerStartOrder}>
          {orderStarted ? 'Ordering' : 'Start Order'}
        </button>
        <div className="w-full mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              id={dish.id}
              isSelected={isSelected(dish.id)}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
              addOptionToItem={addOptionToItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
