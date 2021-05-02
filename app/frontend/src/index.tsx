import { ApolloProvider } from '@apollo/client/react';
import { client } from 'apolloConfig';
import { App } from 'components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'styles/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
