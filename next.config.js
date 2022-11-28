/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const path = require('path');

const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ],
      },
    ]
  },
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });

    // MODULE FEDERATION
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'mountains',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
           './RemoteButton': './components/RemoteButton',
           './Dancer': './components/Mixamo',
          },
        }),
      );
    }

    // LOADERS
    config.module.rules.push({
      test: /\.fbx/,
      type: 'asset/resource'
    })

    
    return config;
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
