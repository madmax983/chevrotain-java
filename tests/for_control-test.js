"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("forControl", () => {
  it("basicForStatement: empty", () => {
    expect(Parser.parse(";;", parser => parser.forControl())).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: undefined,
      expression: undefined,
      expressionList: undefined
    });
  });

  it("basicForStatement: expressionList: one", () => {
    expect(Parser.parse("this;;", parser => parser.forControl())).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: {
        type: "EXPRESSION_LIST",
        list: [
          {
            type: "THIS"
          }
        ]
      },
      expression: undefined,
      expressionList: undefined
    });
  });

  it("basicForStatement: expressionList: multiple", () => {
    expect(Parser.parse("this, super;;", parser => parser.forControl())).to.eql(
      {
        type: "BASIC_FOR_STATEMENT",
        forInit: {
          type: "EXPRESSION_LIST",
          list: [
            {
              type: "THIS"
            },
            {
              type: "SUPER"
            }
          ]
        },
        expression: undefined,
        expressionList: undefined
      }
    );
  });

  it("basicForStatement: variableDeclaration: simple", () => {
    expect(Parser.parse("int i = 0;;", parser => parser.forControl())).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "int"
        },
        declarators: {
          type: "VARIABLE_DECLARATORS",
          list: [
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "i"
                },
                cntSquares: 0
              },
              init: {
                type: "DECIMAL_LITERAL",
                value: "0"
              }
            }
          ]
        }
      },
      expression: undefined,
      expressionList: undefined
    });
  });

  it("basicForStatement: variableDeclaration: multiple", () => {
    expect(
      Parser.parse("int i = 0, j = 0;;", parser => parser.forControl())
    ).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "int"
        },
        declarators: {
          type: "VARIABLE_DECLARATORS",
          list: [
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "i"
                },
                cntSquares: 0
              },
              init: {
                type: "DECIMAL_LITERAL",
                value: "0"
              }
            },
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "j"
                },
                cntSquares: 0
              },
              init: {
                type: "DECIMAL_LITERAL",
                value: "0"
              }
            }
          ]
        }
      },
      expression: undefined,
      expressionList: undefined
    });
  });

  it("basicForStatement: variableDeclaration with annotations", () => {
    expect(
      Parser.parse("@Bean final int i = 0;;", parser => parser.forControl())
    ).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: [
          {
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
            hasBraces: false,
            value: undefined
          },
          {
            type: "MODIFIER",
            value: "final"
          }
        ],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "int"
        },
        declarators: {
          type: "VARIABLE_DECLARATORS",
          list: [
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "i"
                },
                cntSquares: 0
              },
              init: {
                type: "DECIMAL_LITERAL",
                value: "0"
              }
            }
          ]
        }
      },
      expression: undefined,
      expressionList: undefined
    });
  });

  it("basicForStatement: optionalExpression", () => {
    expect(Parser.parse(";this;", parser => parser.forControl())).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: undefined,
      expression: {
        type: "THIS"
      },
      expressionList: undefined
    });
  });

  it("basicForStatement: optionalExpressionList", () => {
    expect(Parser.parse(";;this", parser => parser.forControl())).to.eql({
      type: "BASIC_FOR_STATEMENT",
      forInit: undefined,
      expression: undefined,
      expressionList: {
        type: "EXPRESSION_LIST",
        list: [
          {
            type: "THIS"
          }
        ]
      }
    });
  });

  it("enhancedForStatement", () => {
    expect(
      Parser.parse("Bean bean : Beans", parser => parser.forControl())
    ).to.eql({
      type: "ENHANCED_FOR_STATEMENT",
      declaration: {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: [],
        typeType: {
          type: "IDENTIFIER",
          value: "Bean"
        },
        declarators: {
          type: "VARIABLE_DECLARATORS",
          list: [
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "bean"
                },
                cntSquares: 0
              },
              init: undefined
            }
          ]
        }
      },
      expression: {
        type: "IDENTIFIER",
        value: "Beans"
      }
    });
  });

  it("enhancedForStatement: multiple annotations", () => {
    expect(
      Parser.parse("@Bean final Bean bean : Beans", parser =>
        parser.forControl()
      )
    ).to.eql({
      type: "ENHANCED_FOR_STATEMENT",
      declaration: {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: [
          {
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
            hasBraces: false,
            value: undefined
          },
          {
            type: "MODIFIER",
            value: "final"
          }
        ],
        typeType: {
          type: "IDENTIFIER",
          value: "Bean"
        },
        declarators: {
          type: "VARIABLE_DECLARATORS",
          list: [
            {
              type: "VARIABLE_DECLARATOR",
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: {
                  type: "IDENTIFIER",
                  value: "bean"
                },
                cntSquares: 0
              },
              init: undefined
            }
          ]
        }
      },
      expression: {
        type: "IDENTIFIER",
        value: "Beans"
      }
    });
  });
});
