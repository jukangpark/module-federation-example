const path = require('node:path');
const { ModuleFederationPlugin } = require('webpack').container;
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
    new ModuleFederationPlugin({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true,
        },
        'shared-deps-mf-package': {},
        'lodash.camelcase': {},
        'date-fns': {},
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
