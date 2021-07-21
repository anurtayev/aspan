const { traverse, saveJSON } = require("./util");

module.exports = {
  mergeTag: (toTag, fromTag) => {
    traverse().map(({ path, id }) => {
      const meta = require(path);
      const { tags } = meta;
      if (tags && tags.includes(fromTag)) {
        console.log(id);
        console.log("old tags: ", tags);
        const newTags = [
          ...tags.filter(existingTag => existingTag !== fromTag),
          toTag
        ];
        console.log("new tags: ", newTags);
        saveJSON(path, { ...meta, tags: newTags });
      }
    });
  }
};
