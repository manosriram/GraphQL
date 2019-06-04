const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt
} = require("graphql");
const fetch = require("node-fetch");

const RocketType = new GraphQLObjectType({
  name: "RocketType",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLString },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        const response = await fetch(`https://api.spacexdata.com/v3/launches/`);
        return response.json();
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return response.json();
      }
    },
    rockets: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const response = await fetch(
          `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
        );
        return response.json();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
