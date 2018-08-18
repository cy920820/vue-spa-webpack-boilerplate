## vue-webpack-boilerplate
> This template based on vue2.0.
> Acknowledgements: [vuejs-template](https://github.com/vuejs-templates/webpack).


## Usage
> This is a project template for vue-cli. It is recommended to use npm 3+ for a more efficient dependency tree.

```
$ npm install -g vue-cli
$ vue init Cui-y/vue-webpack-template my-project
$ cd my-project
$ npm start or yarn start (for dev)
$ npm build or yarn build (for prod)
```

## What's Included
- npm run dev:
  - [Webpack](https://github.com/webpack/webpack) + [vue-loader](https://github.com/vuejs/vue-loader) for single file Vue components.
  - hot-reload
  - Source maps
  - Local Mock base on [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- npm run build:
  - JavaScript minified with webpack
  - HTML minified with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
  - Lint-on-save with [ESLint](https://github.com/eslint/eslint)
- npm run lint: eslint --ext .js in src catalogue
- npm run deploy: use [deploy-kit](https://github.com/xiaoyann/deploy-kit) to deploy project
- npm run hotdeploy: hot-deploy


## Development
You can fork this repo to create your own boilerplate and use it with  `vue-cli`.

```
vue init username/repo my-project
```

## Todos
- [ ] Sentry
- [ ] Unit
- [ ] E2e
- [ ] Webpack 4.x
- [ ] Routing lazy loading
