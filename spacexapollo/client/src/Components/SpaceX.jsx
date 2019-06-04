import React, { Fragment } from "react";
import "../App.css";
import ggl from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";

const LaunchesQuery = ggl`
    query LaunchesQuery {
        launches {
            flight_number,
            mission_name,
            launch_date_local,
            launch_success
        }
    }
`;

const SpaceX = () => {
  return (
    <Fragment className="container">
      <h1 className="display-4 my-3">Launches</h1>
      <Query query={LaunchesQuery}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);
          return (
            <Fragment>
              {data.launches.map(launch => {
                return <LaunchItem key={launch.flight_number} data={launch} />;
              })}
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default SpaceX;
