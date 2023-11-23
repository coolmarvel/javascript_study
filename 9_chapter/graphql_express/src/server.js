const express = require("express");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const path = require("path");

const loadedTypes = loadFilesSync("**/*", { extensions: ["graphql"] });

const schema = makeExecutableSchema({ typeDefs: loadedTypes });

const root = {
  posts: require("./posts/posts.model"),
  comments: require("./comments/comments.model"),
};

const app = express();
const port = 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // true
  })
);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
