"use strict";
const SelectLexer = require("./lexer");
const JavaParser = require("./parser");
const SQLToAstVisitor = require("./visitor");

const parser = new JavaParser([]);

// Our visitor has no state, so a single instance is sufficient.
const toAstVisitorInstance = new SQLToAstVisitor();

function parse(inputText, entryPoint = parser => parser.compilationUnit()) {
  // Lex
  const lexResult = SelectLexer.tokenize(inputText);
  parser.input = lexResult.tokens;

  // Automatic CST created when parsing
  const cst = entryPoint(parser);
  if (parser.errors.length > 0) {
    throw Error(
      "Sad sad panda, parsing errors detected!\n" + parser.errors[0].message
    );
  }

  // transform CST to AST
  const ast = toAstVisitorInstance.visit(cst);

  return ast;
}

module.exports = { parse };
