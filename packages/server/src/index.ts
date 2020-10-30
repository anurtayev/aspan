import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import path from "path";
import { options } from "./util";
import { resolvers } from "./resolvers";
import { repoCache, FileSystemDataSource } from "./repo";

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8").toString()
);
const cache = repoCache(options);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { options },
  dataSources: () => {
    return {
      fs: new FileSystemDataSource(cache)
    };
  }
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch(reason => {
    console.log(reason);
  });
