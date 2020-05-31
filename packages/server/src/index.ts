import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { options } from "./util";
import { resolvers } from "./resolvers";
import { repoCache, FileSystemDataSource } from "./repo";

const cache = repoCache(options);

const server = new ApolloServer({
  typeDefs: schema,
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
