import { boxMetaData, unboxMetaData } from "./Meta";

describe("boxMetaData", () => {
  test("it unbox null into empty MetaDataForm - {}", () => {
    expect(unboxMetaData(null)).toStrictEqual({
      tags: null,
      attributes: null,
      title: null,
      description: null,
      print: false,
      favorite: false,
    });
  });

  test("it unboxes properly", () => {
    expect(
      unboxMetaData({
        __typename: "MetaData",
        tags: null,
        attributes: null,
        title: "title1",
        description: null,
      })
    ).toStrictEqual({
      tags: null,
      attributes: null,
      title: "title1",
      description: null,
      print: false,
      favorite: false,
    });
  });

  test("it unboxes properly print tag", () => {
    expect(
      unboxMetaData({
        __typename: "MetaData",
        tags: ["print"],
        attributes: null,
        title: "title1",
        description: null,
      })
    ).toStrictEqual({
      tags: null,
      attributes: null,
      title: "title1",
      description: null,
      print: true,
      favorite: false,
    });
  });

  test("it unboxes properly favorite tag", () => {
    expect(
      unboxMetaData({
        __typename: "MetaData",
        tags: ["favorite"],
        attributes: null,
        title: "title1",
        description: null,
      })
    ).toStrictEqual({
      tags: null,
      attributes: null,
      title: "title1",
      description: null,
      print: false,
      favorite: true,
    });
  });

  test("it unboxes properly favorite tag", () => {
    expect(
      unboxMetaData({
        __typename: "MetaData",
        tags: ["favorite", "print", "family"],
        attributes: null,
        title: "title1",
        description: null,
      })
    ).toStrictEqual({
      tags: ["family"],
      attributes: null,
      title: "title1",
      description: null,
      print: true,
      favorite: true,
    });
  });
});

describe("boxMetaData", () => {
  it("", () => {});
});
