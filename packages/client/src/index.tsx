import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { App } from "./App";
import { ROUTE_REGISTRY, LocalStateParams } from "aspanUtils";
import introspectionQueryResultData from "./fragmentTypes.json";

import "./index.css";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
    }),
  ]),
  resolvers: {},
});

const STARTING_FOLDER = "/";
const initialState: LocalStateParams = {
  displayComponent: ROUTE_REGISTRY.folder,
  id: STARTING_FOLDER,
  scrollY: 0,
  prevDisplayComponent: null,
  prevId: null,
  prevScrollY: null,
};
cache.writeData({
  data: initialState,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
