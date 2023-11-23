const express = require("express");
const path = require("path");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServer } = require("@apollo/server");
const { json } = require("body-parser");
const cors = require("cors");

const loadedTypes = loadFilesSync("**/*", { extensions: ["graphql"] });
const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const port = 3000;

  const schema = makeExecutableSchema({
    typeDefs: loadedTypes,
    resolvers: loadedResolvers,
  });

  // This Apollo server object contains all th middleware
  // and logic to handle incoming graphical requests.
  const server = new ApolloServer({ schema });

  // Ensure we wait for our apollo server to start
  await server.start();

  // Connect apollo middleware with express server
  app.use("/graphql", cors(), json(), expressMiddleware(server, { context: async ({ req }) => ({ token: req.headers.token }) }));

  app.listen(port, () => {
    console.log(`Apollo Server listening on http://localhost:${port}`);
  });
}

startApolloServer();
