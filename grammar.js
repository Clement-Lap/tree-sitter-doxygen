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

    text: ($) => /[^\n@]+/,

    _keyword_with_param: ($) =>
      choice("param", "param[in]", "param[out]", "return"),

    _status: ($) => optional(choice("in", "out")),

    _keyword_without_param: ($) => choice("brief", "file", "author"),

    _param: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    _param_expression: ($) =>
      seq("@", $._keyword_with_param, " {", $._param, "} ", /[^\n@ ]*/),

    _expression: ($) => seq("@", $._keyword_without_param, " ", /[^\n@]*/),

    identifier_with_param: ($) => seq("@", $._keyword_with_param),
    identifier_without_param: ($) => seq("@", $._keyword_without_param),

    variable: ($) => $._param,
    doxygen: ($) =>
      choice(
        seq($.identifier_without_param, $.text),
        seq($.identifier_with_param, $.variable, $.text),
      ),
  },
});
