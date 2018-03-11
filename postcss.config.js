const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcsSimpleVars = require('postcss-simple-vars');
const postcssEasings = require('postcss-easings');
const postcssMixins = require('postcss-mixins');

module.exports = {
  plugins: [
    postcssImport,
    postcssNested,
    postcsSimpleVars,
    postcssMixins,
    postcssEasings,
    cssnext
  ]
};
