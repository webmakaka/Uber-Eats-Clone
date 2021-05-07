import { gql, useLazyQuery } from '@apollo/client';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '__generated__/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    if (!query) {
      return history.replace('/');
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
    </h1>
  );
};
