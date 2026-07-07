const express = require("express");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");
const cors = require("cors");

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      path: error.path,
    }),
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});