import { Header } from 'components/header';
import { useMe } from 'hooks/useMe';
import { NotFound } from 'pages/404';
import { Category } from 'pages/client/category';
import { Restaurant } from 'pages/client/restaurant';
import { Search } from 'pages/client/search';
import { Dashboard } from 'pages/driver/dashboard';
import { Order } from 'pages/order';
import { AddDish } from 'pages/owner/add-dish';
import { AddRestaurant } from 'pages/owner/add-restaurants';
import { MyRestaurant } from 'pages/owner/my-restaurant';
import { MyRestaurants } from 'pages/owner/my-restaurants';
import { ConfirmEmail } from 'pages/user/confirm-email';
import { EditProfile } from 'pages/user/edit-profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserRole } from '__generated__/globalTypes';

const commonRoutes = [
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
  {
    path: '/orders/:id',
    component: <Order />,
  },
];

const clientRoutes = [
  {
    path: '/',
    component: <Restaurant />,
  },
  {
    path: '/search',
    component: <Search />,
  },
  {
    path: '/category/:slug',
    component: <Category />,
  },
  {
    path: '/restaurants/:id',
    component: <Restaurant />,
  },
];

const restaurantRoutes = [
  {
    path: '/',
    component: <MyRestaurants />,
  },
  {
    path: '/add-restaurant',
    component: <AddRestaurant />,
  },
  {
    path: '/restaurants/:id',
    component: <MyRestaurant />,
  },
  {
    path: '/restaurants/:restaurantId/add-dish',
    component: <AddDish />,
  },
];

const driverRoutes = [
  {
    path: '/',
    component: <Dashboard />,
  },
];
export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}

        {data.me.role === UserRole.Owner &&
          restaurantRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}

        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
