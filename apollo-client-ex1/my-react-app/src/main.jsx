import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://flyby-router-demo.herokuapp.com/" }),
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);