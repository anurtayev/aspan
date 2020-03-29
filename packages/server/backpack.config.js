module.exports = {
  // eslint-disable-next-line
  webpack: (config, options, webpack) => {
    config.entry.main = ["./src/index.ts"];

    config.resolve = {
      extensions: [".ts", ".mjs", ".js", ".json", ".gql", ".graphql"]
    };

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    );

    return config;
  }
};
