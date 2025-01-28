import { WebSocketServer } from 'ws'

const PORT = 5000

const wsServer = new WebSocketServer(
  {
    port: PORT,
  },
  () => console.log(`Server started on port ${PORT}`),
)

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
  wsServer.clients.forEach((client) => client.send(JSON.stringify(mes)))
}

// function broadcastMessage(mes, id) {
//   wsServer.clients.forEach((client) => {
//     if (client.id === id) client.send(JSON.stringify(mes))
//   })
// }
