/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: cookedOrders
// ====================================================

export interface cookedOrders_cookedOrders_driver {
  __typename: "User";
  email: string;
}

export interface cookedOrders_cookedOrders_customer {
  __typename: "User";
  email: string;
}

export interface cookedOrders_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface cookedOrders_cookedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: cookedOrders_cookedOrders_driver | null;
  customer: cookedOrders_cookedOrders_customer | null;
  restaurant: cookedOrders_cookedOrders_restaurant | null;
}

export interface cookedOrders {
  cookedOrders: cookedOrders_cookedOrders;
}
