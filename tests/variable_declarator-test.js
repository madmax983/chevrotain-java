"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("variableDeclarator", () => {
  it("without init", () => {
    expect(Parser.parse("A", parser => parser.variableDeclarator())).to.eql({
      type: "VARIABLE_DECLARATOR",
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: {
          type: "IDENTIFIER",
          value: "A"
        },
        cntSquares: 0
      },
      init: undefined
    });
  });

  it("with init", () => {
    expect(
      Parser.parse("A = this", parser => parser.variableDeclarator())
    ).to.eql({
      type: "VARIABLE_DECLARATOR",
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: {
          type: "IDENTIFIER",
          value: "A"
        },
        cntSquares: 0
      },
      init: {
        type: "THIS"
      }
    });
  });
});
