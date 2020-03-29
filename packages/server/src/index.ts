import { ApolloServer } from "apollo-server";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { makeExecutableSchema } from "graphql-tools";
import { MyDataSources, RepositoryOptions } from "./types";
import FileSystemDataSource from "./FileSystemDataSource";
import { options } from "./config";
import { loadSchema } from "@graphql-toolkit/core";
import { UrlLoader } from "@graphql-toolkit/url-loader";
import { JsonFileLoader } from "@graphql-toolkit/json-file-loader";
import { GraphQLFileLoader } from "@graphql-toolkit/graphql-file-loader";
import { readFileSync } from "fs";

import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs: readFileSync("./src/schema.graphql", "utf8"),
  resolvers,
  context: options,
  dataSources: (): any => ({
    fs: new FileSystemDataSource()
  })
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch(reason => {
    console.log(reason);
  });
