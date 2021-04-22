import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from 'apollo';
import React from 'react';
import { LoggedInRouter } from 'routers/logged-in-router';
import { LoggedOutRouter } from 'routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
