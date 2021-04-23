import { Login } from 'pages/login';
import { CreateAccount } from 'pages/create-account';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
