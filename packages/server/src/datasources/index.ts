import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import FileSystemDataSource from "./FileSystemDataSource";
import { IContext } from "../util";

export const dataSources = (): DataSources<IContext> => ({
  fs: new FileSystemDataSource()
});
