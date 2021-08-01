const { extname, relative } = require("path");
const { writeJSONSync, removeSync } = require("fs-extra");

const removeEmptyTags = json => {
  if (json.tags && json.tags.length) return json;

  const { tags, ...rest } = json; //eslint-disable-line
  return rest;
};

module.exports = {
  traverse: () =>
    require("klaw-sync")(process.env.REPOSITORY_PATH, {
      nodir: true,
      traverseAll: true,
      filter: ({ path }) => extname(path) === ".json"
    }).map(({ path, stats }) => ({
      path,
      id: "/" + relative(process.env.REPOSITORY_PATH, path),
      stats
    })),

  traverseFiles: () =>
    require("klaw-sync")(process.env.REPOSITORY_PATH, {
      nodir: true,
      traverseAll: true,
      filter: ({ path }) => extname(path) === process.env.EXTS
    }),

  saveJSON: (path, json) => {
    if (typeof json !== "object") removeSync(path);

    const cleansedJSON = removeEmptyTags(json);

    Reflect.ownKeys(cleansedJSON).length
      ? writeJSONSync(path, cleansedJSON)
      : removeSync(path);
  },

  removeEmptyTags
};
