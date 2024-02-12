const path = require('path');
const crypto = require('crypto');

const { name, version } = require(path.resolve(__dirname, './package.json'));

const versionHash = crypto.createHash('md5').update(`${name}@${version}`).digest('hex').slice(0, 4);

const replacementStrings = {
  'process.env.VERSION_HASH': JSON.stringify(versionHash),
  'process.env.PACKAGE_VERSION': JSON.stringify(version),
};

module.exports = {
  build: {
    replacementStrings,
    systemjs: {
      external: [
        'react',
        'react-dom',
        'hammerjs',
        '@nebula.js/stardust',
        'picasso.js',
        'picasso-plugin-q',
        'qlik-chart-modules',
        'qlik-object-conversion',
      ],
    },
  },
};
