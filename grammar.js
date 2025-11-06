/**
 * @file Doxygen, JSDoc, etc...
 * @author LAPORTE Clément <clem@etik.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "doxygen",

  rules: {
    source_file: ($) => repeat(choice($.doxygen, $.text)),

    with_params: ($) =>
      choice(
        "param",
        "param[in]",
        "param[out]",
        "params",
        "params[in]",
        "params[out]",
        "return",
        "returns",
      ),
    text_only: ($) =>
      choice(
        "brief",
        "file",
        "author",
        "authors",
        "license",
        "def",
        "deprecated",
        "copyright",
        "date",
        "brief",
        "fn",
      ),
    prefix: ($) => "@",
    // _status: ($) => choice("in", "out"),

    variable: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    text: ($) => /[^\n@]+/,

    doxygen: ($) =>
      choice(
        seq(field("identifier", seq($.prefix, $.text_only)), $.text),
        seq(
          field("identifier", seq($.prefix, $.with_params)),
          $.variable,
          $.text,
        ),
      ),
  },
});
