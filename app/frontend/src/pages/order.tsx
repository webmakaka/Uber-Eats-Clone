import { gql, useQuery } from '@apollo/client';
import { FULL_ORDER_FRAGMENT } from 'fragments';
import { useMe } from 'hooks/useMe';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { getOrder, getOrderVariables } from '__generated__/getOrder';
import { orderUpdates } from '__generated__/orderUpdates';

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data: userData } = useMe();
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
    GET_ORDER,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  return (
    <div className="container flex justify-center mt-32">
      <Helmet>
        <title>Order #{params.id} | Nuber Eats</title>
      </Helmet>
      <div className="flex flex-col justify-center w-full border border-gray-800 max-w-screen-sm">
        <h4 className="w-full py-5 text-xl text-center bg-gray-800 text-hite">
          Order #{params.id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center">
          ${data?.getOrder.order?.total}
        </h5>

        <div className="p-5 text-xl grid gap-6">
          <div className="pt-5 border-t border-gra-y-700">
            Prepared By:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="pt-5 border-t border-gray-700 ">
            Deliver To:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="py-5 border-t border-b border-gray-700">
            Driver:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || 'Not yet.'}
            </span>
          </div>
          <div className="py-5 border-t border-b border-gray-700">
            Me: <span className="font-medium">{userData?.me.role}</span>
          </div>
          <div className="py-5 border-t border-b border-gray-700">
            Order Status:{' '}
            <span className="font-medium">{data?.getOrder.order?.status}</span>
          </div>
          {userData?.me.role === 'Client' && (
            <span className="mt-5 mb-3 text-2xl text-center text-lime-600">
              Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.me.role === 'Owner' && (
            <>
              {data?.getOrder.order?.status === 'Pending' && (
                <button className="btn">Accept Order</button>
              )}
              {data?.getOrder.order?.status === 'Cooking' && (
                <button className="btn">Order Cooked</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
