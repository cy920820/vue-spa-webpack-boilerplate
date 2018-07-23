const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage
} = require('./utils')

const pkg = require('./package.json')
const templateVersion = pkg.version

module.exports = {
  // 自定义的 Handlebars 辅助函数 (http://handlebarsjs.com/block_helpers.html)
  // helpers字段是一个包含自定义的Handlebars辅助函数的对象，自定义的函数可以在template中使用 if_or

  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },

    template_version() {
      return templateVersion
    }
  },

  // 收集用户的自定义数据, vue-cli中间件askQuestions使用
  // 用户输入完成之后, template 目录下的所有文件将会用 Handlebars 进行渲染. 用户输入的数据会作为模板渲染时的使用数据:
  // 主要体现在template/package.json的一些Key Value. 用 Handlebars 进行渲染

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },

    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project'
    },

    author: {
      type: 'string',
      message: 'Author'
    },

    router: {
      type: 'confirm',
      message: 'Install vue-router?'
    },

    stylus: {
      type: 'confirm',
      message: 'Using stylus?'
    },

    fastclick: {
      type: 'confirm',
      message: 'Using fastclick?'
    },

    baobabui: {
      type: 'confirm',
      message: 'Using baobab-ui?'
    },

    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?'
    },

    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [{
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        },
      ]
    },

    sentry: {
      type: 'confirm',
      message: 'Using sentry?'
    },

    // unit: {
    //   type: 'confirm',
    //   message: 'Set up unit tests',
    // },

    // runner: {
    //   when: 'unit',
    //   type: 'list',
    //   message: 'Pick a test runner',
    //   choices: [
    //     {
    //       name: 'Jest',
    //       value: 'jest',
    //       short: 'jest',
    //     },
    //     {
    //       name: 'Karma and Mocha',
    //       value: 'karma',
    //       short: 'karma',
    //     },
    //     {
    //       name: 'none (configure it yourself)',
    //       value: 'noTest',
    //       short: 'noTest',
    //     },
    //   ],
    // },

    // e2e: {
    //   when: 'isNotTest',
    //   type: 'confirm',
    //   message: 'Setup e2e tests with Nightwatch?',
    // },

    autoInstall: {
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [{
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        }
      ]
    }
  },

  // 根据条件过滤文件 vue-cli中间件filterFiles使用
  // filters字段是一个包含文件过滤规则的对象，键用于定义符合minimatch glob pattern规则的过滤器，键值是prompts中用户的输入值或表达式
  filters: {
    ".eslintrc.json": "lint",
    ".eslintignore": "lint",
    "src/router/**/*": "router",
    "src/**/*.styl": "stylus",
    "src/**/*.css": "!stylus",
    "src/sentry.js": "sentry"
  },

  // 完成渲染时的回调

  complete: function (data, {
    chalk
  }) { // data, helpers 都是由vue-cli传入
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}
