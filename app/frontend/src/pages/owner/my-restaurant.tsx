import { gql, useQuery } from '@apollo/client';
import { RESTAURANT_FRAGMERNT } from 'fragments';
import { useParams } from 'react-router';
import {
  myRestaurant,
  myRestaurantVariables,
} from '__generated__/myRestaurant';

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMERNT}
`;

export const MyRestaurant = () => {
  interface IParams {
    id: string;
  }

  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  return <h1>My Restaurant</h1>;
};
