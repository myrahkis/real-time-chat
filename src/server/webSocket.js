import { WebSocketServer } from 'ws'

const PORT = 5000

const wsServer = new WebSocketServer(
  {
    port: PORT,
  },
  () => console.log(`Server started on port ${PORT}`),
)

wsServer.on('connection', function connection(ws) {
  //   ws.id = Date.now() // id для приватной комнаты

  ws.on('message', function (message) {
    message = JSON.parse(message)

    switch (message.event) {
      case 'connection':
        broadcastMessage(message)
        break
      case 'message':
        broadcastMessage(message)
    }
  })
})

// отправка сообщ всем подключенным на данный момент
function broadcastMessage(mes, id) {
  wsServer.clients.forEach((client) => client.send(JSON.stringify(mes)))
}

// function broadcastMessage(mes, id) {
//   wsServer.clients.forEach((client) => {
//     if (client.id === id) client.send(JSON.stringify(mes))
//   })
// }
