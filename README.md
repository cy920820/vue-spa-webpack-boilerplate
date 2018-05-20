## vue-webpack-boilerplate
> This template based on vue2.0
鸣谢[vuejs-template](https://github.com/vuejs-templates/webpack)


## Usage
> This is a project template for vue-cli. It is recommended to use npm 3+ for a more efficient dependency tree.

```
$ npm install -g vue-cli
$ vue init Cui-y/vue-webpack-template my-project
$ cd my-project
$ npm install or yarn install
$ npm start or yarn start (for dev)
$ npm build or yarn build (for prod)
```

## What's Included
- npm run dev:
  - Webpack + vue-loader for single file Vue components.
  - hot-reload
  - Source maps
  - Local Mock
- npm run build:
  - JavaScript minified with UglifyJS
  - HTML minified with html-webpack-plugin
  - Lint-on-save with ESLint
- npm run lint: eslint --ext .js in src catalogue
- npm run deploy: use [deploy-kit](https://github.com/xiaoyann/deploy-kit) to deploy project
- npm run hotdeploy: hot-deploy


## Development
You can fork this repo to create your own boilerplate and use it with  `vue-cli`.

```
vue init username/repo my-project
```
