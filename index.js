const express = require("express");
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
const graphQl = require("express-graphql");
const app = express();
const { buildSchema } = require("graphql");

app.use(bodyparser.json());
app.use(
  "/graphql",
  graphQl({
    schema: buildSchema(`
    type RootQuery {
     events: [String!]!
    }

    type RootMutation {
        createEvent(name: String): String
    }

    schema {
        query:  RootQuery
        mutation:  RootMutation
    }
    `),

    rootValue: {
      events: () => {
        return ["Romantic Cooking", "Sailing", "All-Night Coding."];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.send("Hey there!");
});

app.listen(port, () => {
  console.log(`Server at ${port}`);
});

module.exports = app;
