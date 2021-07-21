const { removeEmptyTags } = require("./util");

describe("removeEmptyTags", () => {
  it("should remove empty tags array", () => {
    const json = { tags: [] };
    expect(removeEmptyTags(json)).toEqual({});
  });

  it("should not remove non empty tags array", () => {
    const json = { tags: ["a"] };
    expect(removeEmptyTags(json)).toEqual({ tags: ["a"] });
  });
});
