import { NotFound } from 'pages/404';
import { CreateAccount } from 'pages/create-account';
import { Login } from 'pages/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
