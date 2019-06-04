const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Server at ${port}`));
module.exports = app;
