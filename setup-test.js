const hook = require('css-modules-require-hook');
const sass = require('node-sass');

/*
  take care of css modules
 */
hook({
  extensions: ['.scss', '.css'],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({ file }).css,
});

/*
  init jsdom to simulate browser
 */
const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
