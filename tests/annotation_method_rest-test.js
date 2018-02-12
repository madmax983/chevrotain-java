"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotationMethodRest", () => {
  it("identifier", () => {
    expect(Parser.parse("a()", parser => parser.annotationMethodRest())).to.eql(
      {
        type: "ANNOTATION_METHOD_REST",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        defaultValue: undefined
      }
    );
  });

  it("defaultValue", () => {
    expect(
      Parser.parse("a() default @Bean", parser => parser.annotationMethodRest())
    ).to.eql({
      type: "ANNOTATION_METHOD_REST",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      defaultValue: {
        type: "DEFAULT_VALUE",
        value: {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          value: undefined,
          hasBraces: false
        }
      }
    });
  });
});
