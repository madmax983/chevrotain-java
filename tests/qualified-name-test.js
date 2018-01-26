"use strict";
const Parser = require("../src/index");

describe("package", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.qualifiedName())).toEqual({
      type: "QUALIFIED_NAME",
      name: ["pkg"]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("pkg.name", parser => parser.qualifiedName())).toEqual({
      type: "QUALIFIED_NAME",
      name: ["pkg", "name"]
    });
  });
});
