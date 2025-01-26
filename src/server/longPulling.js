import express from 'express'
import cors from 'cors'
import events from 'events'

const PORT = 5000

// для регистрации и подписки на события
const emitter = new events.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())

// польз отправ гет запрос, но ему не возвращается ответ,
// подписываемся на событие и ждем
app.get('/get-message', (req, res) => {
  // всем польз у кот висит подлючение возвращается сообщение
  emitter.once('newMessage', (mes) => res.json(mes))
})

// др участник чата отправляет сообщ
app.post('/new-message', (req, res) => {
  const message = req.body

  emitter.emit('newMessage', message)

  res.status(200)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
