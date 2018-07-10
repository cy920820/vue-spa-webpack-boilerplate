const path = require('path')

module.exports = {
  // sever account, address, port
  server: 'user:pwd@10.133.3.4:22',
  // deploy all files in the directory
  workspace: path.join(__dirname, '/dist'),
  // ignore the matched files (glob pattern: https://github.com/isaacs/node-glob#glob-primer)
  // support array of glob pattern
  ignore: '**/*.map',
  // where the files are placed on the server
  deployTo: '/data1/htdocs/testapp',
  // you can specify different place for each file
  rules: [
    {
      test: /dist\/(.*)$/,
      // $1, $2... means the parenthesized substring matches
      // [$n] will be replaced with matched string
      dest: 'public/static/[$1]'
    },
    {
      test: /views\/((?:[^/]+\/)*?[^\/]+).html$/,
      dest: 'app/views/[$1].phtml'
    }
  ]
}
