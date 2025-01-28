import { WebSocketServer } from 'ws'

const PORT = 5000

const wsServer = new WebSocketServer(
  {
    port: PORT,
  },
  () => console.log(`Server started on port ${PORT}`),
)

wsServer.on('connection', function connection(ws) {
  const userId = Date.now()
  ws.id = userId // id для приватной комнаты

  console.log(`New user connected: ${userId}`)

  ws.on('message', function (message) {
    message = JSON.parse(message)

    switch (message.event) {
      case 'connection':
        message = {
          ...message,
          userId,
        }
        broadcastMessage(message)
        break

      case 'disconnection':
        broadcastMessage(message)
        break
      case 'message':
        message = {
          ...message,
          userId,
        }
        broadcastMessage(message)
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
