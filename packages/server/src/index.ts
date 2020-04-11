import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { Context } from "./util";
import { resolvers } from "./resolvers";
import { dataSources } from "./datasources";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: Context,
  dataSources
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch(reason => {
    console.log(reason);
  });
