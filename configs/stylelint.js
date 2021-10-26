module.exports = {
  plugins: ["stylelint-scss"],
  rules: {
    "string-quotes": "double",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-no-invalid-hex": true,
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "function-calc-no-unspaced-operator": true,
    "function-comma-newline-after": "always-multi-line",
    "function-comma-space-after": "always-single-line",
    "function-comma-space-before": "never",
    "function-parentheses-newline-inside": "always-multi-line",
    "function-parentheses-space-inside": "never-single-line",
    "function-whitespace-after": "always",
    "value-no-vendor-prefix": true,
    "value-list-comma-newline-after": "always-multi-line",
    "value-list-comma-space-after": "always-single-line",
    "value-list-comma-space-before": "never",
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-block-semicolon-newline-after": "always-multi-line",
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "block-closing-brace-newline-after": [
      "always",
      {
        ignoreAtRules: ["if", "else", "elseif"],
      },
    ],
    "block-closing-brace-newline-before": "always-multi-line",
    "block-closing-brace-space-before": "always-single-line",
    "block-no-empty": true,
    "block-opening-brace-newline-after": "always-multi-line",
    "block-opening-brace-space-after": "always-single-line",
    "block-opening-brace-space-before": "always",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-list-comma-space-before": "never",
    "selector-pseudo-element-colon-notation": "double",
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-trailing-semicolon": "always",
    "declaration-block-no-duplicate-properties": true,
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",
    "media-query-list-comma-newline-after": "always-multi-line",
    "media-query-list-comma-space-after": "always-single-line",
    "media-query-list-comma-space-before": "never",
    "media-feature-parentheses-space-inside": "never",
    "at-rule-empty-line-before": [
      "always",
      {
        except: [
          "blockless-after-blockless",
          "blockless-after-same-name-blockless",
          "first-nested",
        ],
        ignore: ["after-comment"],
        ignoreAtRules: ["else", "elseif"],
      },
    ],
    indentation: 2,
    "max-empty-lines": 1,
    "no-missing-end-of-source-newline": true,
    "comment-empty-line-before": [
      "always",
      {
        ignore: ["stylelint-commands"],
      },
    ],
    "comment-whitespace-inside": "always",
    "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
    "scss/at-else-closing-brace-space-after": "always-intermediate",
    "scss/at-else-empty-line-before": "never",
    "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
    "scss/at-if-closing-brace-space-after": "always-intermediate",
  },
};