import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { Context } from "./util";
import { resolvers } from "./resolvers";
import FileSystemDataSource from "./dataSources/FileSystemDataSource";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => Context,
  dataSources: () => {
    return {
      moviesAPI: new FileSystemDataSource()
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
