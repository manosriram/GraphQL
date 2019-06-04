import React, { Fragment } from "react";
import "./App.css";
import SpaceX from "./Components/SpaceX";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import logo from "./spacex.svg";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <img src={logo} />
        <SpaceX />
      </div>
    </ApolloProvider>
  );
};

export default App;
