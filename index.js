var fs = require('fs')
var http = require('http')
var opn = require('opn')
var path = require('path')
var shoe = require('shoe')
var getport = require('getport')

module.exports = function (cb) {
  getport(5000, 5999, function (err, port) {
    if (err) throw err
    else run(port)
  })

  function run (port) {
    // Serve the static files.
    var server = http.createServer(function(req, res) {
      if (/bundle.js/.test(req.url)) {
        fs.createReadStream(path.join(__dirname, 'bundle.js')).pipe(res)
      } else if (/window.jpg/.test(req.url)) {
        fs.createReadStream(path.join(__dirname, 'window.jpg')).pipe(res)
      } else {
        fs.createReadStream(path.join(__dirname, 'picker.html')).pipe(res)
      }
    })

    server.setTimeout(1000)

    server.listen(port, function() {
      opn('http://localhost:' + port)
    })

    let value
    var sock = shoe(function(stream) {
      function end() {
        server.close()
        cb(!value ? new Error('no value picked') : null, value)
      }
      stream.on('end', end)
      stream.on('close', end)
      stream.on('data', function(data) {
        value = JSON.parse(data.toString())
      })
    })
    sock.install(server, '/picker')
  }
}

