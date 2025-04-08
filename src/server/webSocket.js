import http from 'http'
import { WebSocketServer } from 'ws'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('WebSocket server is running')
})

const wsServer = new WebSocketServer({ server })

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// обработка соединений
wsServer.on('connection', function connection(ws) {
  const userId = Date.now().toString()
  ws.id = userId

  ws.send(JSON.stringify({ event: 'assignId', userId }))

  ws.on('message', function (message) {
    message = JSON.parse(message)

    switch (message.event) {
      case 'connection':
        broadcastMessage({ ...message, userId })
        break
      case 'disconnection':
        broadcastMessage(message)
        break
      case 'message':
        broadcastMessage({ ...message, userId })
    }
  })
})

// отправка сообщ всем подключенным на данный момент
function broadcastMessage(mes) {
  wsServer.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(mes))
    }
  })
}
