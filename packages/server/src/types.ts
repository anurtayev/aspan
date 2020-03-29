import FileSystemDataSource from "./FileSystemDataSource";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";

export interface MyDataSources {
  fs: FileSystemDataSource;
}

export type RepositoryOptions = {
  path: string;
  metaFolder: string;
  thumbsPrefix: string;
  thumbsLength: number;
  thumbsWidth: number;
  exts: string[];
};

export type Ctx = RepositoryOptions & {
  dataSources: MyDataSources;
};
