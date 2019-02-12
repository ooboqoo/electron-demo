const net = require('net')

const PIPE_NAME = 'test'
const PIPE_PATH = '\\\\.\\pipe\\' + PIPE_NAME

const log = console.log

const server = net.createServer(function (pipe) {
  log('[Server connect] new connection')

  sendMessage(pipe)

  pipe.on('data', function (buf) {
    console.log('[Server recev]', buf.toString())
  })

  pipe.on('end', function () {
    log('[Server connect] end')
  })
})

server.on('close', function () {
  log('[Server] closed')
})

server.listen(PIPE_PATH, function () {
  log('[Server] start listening')
})

function random (min, max) {
  return ((Math.random() * (max - min) + min) * 100 | 0) / 100
}

function sendMessage (pipe) {
  if (pipe.destroyed) { return }
  const data = {penstatus: {e: 1, x: random(0, 100), y: random(0, 100)}}
  const msg = JSON.stringify(data) + '\n'
  pipe.write(msg)
  console.log('[Server send]', msg)
  setTimeout(() => sendMessage(pipe), Math.random() * 10000)
}
