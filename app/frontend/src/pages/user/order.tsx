import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getOrder, getOrderVariables } from '__generated__/getOrder';

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data);
  return <h1>{params.id}</h1>;
};
