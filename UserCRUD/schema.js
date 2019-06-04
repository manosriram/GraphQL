const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");
const fetch = require("node-fetch");

const JsonFamily = new GraphQLObjectType({
  name: "jsonfamily",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: AddressType }, // As it is a Object, it is defined below as "AddressType".
    phone: { type: GraphQLString },
    website: { type: GraphQLString }
  })
});

// Object for Address Fields.
const AddressType = new GraphQLObjectType({
  name: "address",
  fields: () => ({
    street: { type: GraphQLString },
    suite: { type: GraphQLString },
    city: { type: GraphQLString },
    zipcode: { type: GraphQLString }
  })
});

// Root Query which is the Root part of this Schema.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    jsonusers: {
      type: JsonFamily,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const response = await fetch(
          `http://localhost:3000/jsonusers/${args.id}`
        );
        return response.json();
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: JsonFamily,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const response = await fetch(`http://localhost:3000/jsonusers`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: args.name,
            email: args.email,
            age: args.age
          })
        });
        return response.json();
      }
    },
    deleteUser: {
      type: JsonFamily,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const response = await fetch(
          `http://localhost:3000/jsonusers/${args.id}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        return response.json();
      }
    },
    updateUser: {
      type: JsonFamily,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const response = await fetch(
          `http://localhost:3000/jsonusers/${args.id}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(args)
          }
        );
        return response.json();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
