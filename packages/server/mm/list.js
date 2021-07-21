const { traverse } = require("./util");

/**
 *
 * @returns { path, meta }
 */
const getMetadata = () =>
  traverse().map(({ path, id }) => {
    return { path, id, meta: require(path) };
  });

module.exports = {
  listTags: () =>
    Array.from(
      getMetadata()
        .reduce((acc, { meta: { tags } }) => {
          tags && tags.forEach(tag => acc.add(tag));
          return acc;
        }, new Set())
        .values()
    )
      .sort()
      .forEach(tag => console.log(`|${tag}|`)),

  listMetaFiles: () =>
    getMetadata().forEach(({ id, meta: { tags, attributes } }) => {
      console.log("\n==> ", id);
      tags && console.log("\ntags:");
      tags && console.log(tags);
      attributes && console.log("\nattributes:");
      attributes && console.log(attributes);
    })
};
