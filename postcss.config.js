const cssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcsSimpleVars = require('postcss-simple-vars');
const postcssEasings = require('postcss-easings');

module.exports = {
  plugins: [
    postcssNested,
    postcsSimpleVars,
    postcssEasings,
    cssnext
  ]
};
