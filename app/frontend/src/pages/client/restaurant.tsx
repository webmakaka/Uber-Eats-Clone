import { gql, useQuery } from '@apollo/client';
import { Dish } from 'components/dish';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from 'fragments';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
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
  console.log(data);

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

      <div className="container mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
        {data?.restaurant.restaurant?.menu.map((dish, index) => (
          <Dish
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            isCustomer={true}
            options={dish.options}
          />
        ))}
      </div>
    </div>
  );
};
