import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { defaultTheme, AspanContextComponent } from "common";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider
      client={
        new ApolloClient({
          uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
          cache: new InMemoryCache(),
        })
      }
    >
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <AspanContextComponent>
            <App />
          </AspanContextComponent>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
