const { traverse, saveJSON } = require("./util");

module.exports = {
  deleteTag: tag => {
    traverse().map(({ path, id }) => {
      const meta = require(path);
      if (meta.tags && meta.tags.includes(tag)) {
        console.log(id, meta.tags);
        const tags = meta.tags.filter(existingTag => existingTag !== tag);
        saveJSON(path, { ...meta, tags });
      }
    });
  }
};
