import { gql, useQuery, useSubscription } from '@apollo/client';
import { Dish } from 'components/dish';
import {
  RESTAURANT_FRAGMENT,
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  FULL_ORDER_FRAGMENT,
} from 'fragments';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  myRestaurant,
  myRestaurantVariables,
} from '__generated__/myRestaurant';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import { pendingOrders } from '__generated__/pendingOrders';
import { useEffect } from 'react';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
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
  console.log(data);

  const chartData = [
    { x: 1, y: 3000 },
    { x: 2, y: 1500 },
    { x: 3, y: 4200 },
    { x: 4, y: 2300 },
    { x: 5, y: 7100 },
    { x: 6, y: 6500 },
    { x: 7, y: 4500 },
  ];

  const { data: subscriptionData } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );

  const history = useHistory();

  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/opders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData]);

  return (
    <div>
      <div
        className="bg-gray-700 bg-center bg-cover py-28"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="mb-10 text-4xl font-medium">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className="px-10 py-3 mr-8 text-white bg-gray-800"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className="px-10 py-3 text-white bg-lime-700">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4>Please upload a dish</h4>
          ) : (
            <div className="mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-2xl font-medium text-center">Sales</h4>
          <div className="mx-auto">
            <VictoryChart
              height={500}
              theme={VictoryTheme.material}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryLabel
                    style={{ fontSize: 18 } as any}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    stroke: 'blue',
                    strokeWidth: 5,
                  },
                }}
              />
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 20, fill: '#3d7c0f' } as any,
                }}
                dependentAxis
                tickFormat={(tick) => `$${tick}`}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                    fill: '#3d7c0f',
                    angle: 45,
                  } as any,
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString('ru')}
              />
            </VictoryChart>
            <VictoryPie data={chartData} />
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                tickFormat={(step) => `$${step / 1000}k`}
                dependentAxis
              />
              <VictoryAxis tickFormat={(step) => `Day ${step}`} />
              <VictoryBar data={chartData} />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
