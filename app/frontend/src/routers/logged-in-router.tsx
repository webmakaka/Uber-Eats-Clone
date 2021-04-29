import { Header } from 'components/header';
import { useMe } from 'hooks/useMe';
import { NotFound } from 'pages/404';
import { Restaurants } from 'pages/client/restaurants';
import { ConfirmEmail } from 'pages/user/confirm-email';
import { EditProfile } from 'pages/user/edit-profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
