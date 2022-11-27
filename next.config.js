/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const path = require('path');

const nextConfig = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'mountains',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            // './react': 'react',
            // './react-dom': 'react-dom',
            './Mountains': './components/Mountains',
          },
          // shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
        }),
      );
    }

    return config;
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
