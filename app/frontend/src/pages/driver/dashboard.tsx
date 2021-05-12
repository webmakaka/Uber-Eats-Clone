import { gql, useMutation, useSubscription } from '@apollo/client';
import { FULL_ORDER_FRAGMENT } from 'fragments';
import GoogleMapReact, { Position } from 'google-map-react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { cookedOrders } from '__generated__/cookedOrders';
import { takeOrder, takeOrderVariables } from '__generated__/takeOrder';

const COOCKE_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });

  const onSuccess = (position: Position) => {
    console.log(position);
  };

  //   const onError = (error: PositionErrorCallback){
  //   console.log(error)
  // }
  //
  // useEffect(() => {
  //   navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true});
  // }, []);
  //
  //
  const { data: cookedOrdersData } = useSubscription<cookedOrders>(
    COOCKE_ORDERS_SUBSCRIPTION
  );

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
    }
  }, [cookedOrdersData]);

  const history = useHistory();

  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      history.push(`/opders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };

  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );

  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: '95vh' }}
      >
        <GoogleMapReact
          defaultCenter={{ lat: 37.58, lng: 126.95 }}
          defaultZoom={20}
          bootstrapURLKeys={{ key: 'NoKEY' }}
        ></GoogleMapReact>
      </div>
      <div className="relative px-5 py-8 mx-auto bg-white max-w-screen-sm -top-10 shado-lg">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-3xl font-medium text-center">
              New Cooked Order
            </h1>
            <h1 className="my-3 text-3xl font-medium text-center">
              Pick it up soon @{' '}
              {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <button
              onClick={() => triggerMutation(cookedOrdersData?.cookedOrders.id)}
              className="block w-full mt-5 text-center btn"
            >
              Accept Challenge $rarr;
            </button>
          </>
        ) : (
          <h1 className="text-3xl font-medium text-center">No Orders yet</h1>
        )}
      </div>
    </div>
  );
};
