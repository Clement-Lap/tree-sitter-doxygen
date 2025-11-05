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

    _params_with_briefs: ($) =>
      choice(
        seq("param", optional(seq("[", choice($._status), "]"))),
        seq("params", optional(seq("[", choice($._status), "]"))),
        "return",
        "returns",
      ),
    _briefs: ($) =>
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
    _prefix: ($) => choice("@", "\\"),
    _status: ($) => choice("in", "out"),

    variable: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    code: ($) => /[^\n@_]/,
    text: ($) => /[^\n@]+/,

    doxygen: ($) =>
      choice(
        seq(field("identifier", $._briefs), " ", $.text),
        seq(
          field("identifier", $._params_with_briefs),
          " ",
          $.variable,
          $.text,
        ),
      ),
  },
});
