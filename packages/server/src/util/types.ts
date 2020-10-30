import { FileSystemDataSource } from "../repo";
import { IOptions } from "../util";

export type IContext = {
  options: IOptions;
  dataSources: { fs: FileSystemDataSource };
};
