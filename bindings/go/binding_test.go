package tree_sitter_doxygen_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_doxygen "github.com/clement-lap/tree-sitter-doxygen/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_doxygen.Language())
	if language == nil {
		t.Errorf("Error loading Doxygen grammar")
	}
}
