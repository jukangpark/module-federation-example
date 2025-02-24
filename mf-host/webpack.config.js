const path = require('node:path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'swc-loader',
        exclude: /node_modules/,
        options: {
          jsc: {
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
            target: 'es2017',
            parser: {
              syntax: 'typescript',
              jsx: true,
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: false,
    }),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote1: 'remote1@http://localhost:3001/remoteEntry.js',
        remote2: 'remote2@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
        },
        'shared-deps-mf-package': {},
      },
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode 옵션을 static 으로 설정하면, 번들링된 결과물을 파일로 저장합니다. (https://www.npmjs.com/package/webpack-bundle-analyzer#static-mode)
      analyzerMode: 'static',
      // reportFilename 옵션을 설정하면, 저장된 파일의 이름을 설정할 수 있습니다. (https://www.npmjs.com/package/webpack-bundle-analyzer#reportfilename)
      reportFilename: 'bundle-report.html',
      // openAnalyzer 옵션을 true 로 설정하면, 저장된 파일을 자동으로 엽니다. (https://www.npmjs.com/package/webpack-bundle-analyzer#open-analyzer-on-build)
      openAnalyzer: false,
    }),
  ],
};
