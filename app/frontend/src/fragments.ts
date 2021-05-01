import { gql } from '@apollo/client';

export const RESTAURANT_FRAGMERNT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;
