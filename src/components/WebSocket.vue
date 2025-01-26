<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const messages = ref([])
const newMes = ref('')
const connected = ref(false)
const user = ref('')

let socket = null

function connect() {
  socket = new WebSocket('ws://localhost:5000')

  // В момент подключения
  socket.onopen = () => {
    console.log('Подключение установлено...')
    connected.value = true

    const message = {
      event: 'connection',
      username: user.value,
      id: Date.now(),
    }

    socket.send(JSON.stringify(message))
  }
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)

    messages.value = [message, ...messages.value]
  }
  socket.onclose = () => {
    console.log('Socket закрыт')
  }
  socket.onerror = () => {
    console.log('Socket произошла ошибка')
  }
}

async function sendMessage() {
  const message = {
    event: 'message',
    username: user.value,
    message: newMes.value,
    id: Date.now(),
  }

  socket.send(JSON.stringify(message))
  newMes.value = ''
}
</script>

<template>
  <div v-if="connected">
    <div>
      <input type="text" v-model.trim="newMes" />
      <button @click="sendMessage">Send</button>
    </div>
    <div>
      <ul>
        <li v-for="mes in messages" :key="mes.id">
          <p v-if="mes.event === 'connection'">{{ mes.username }} вошел в чат</p>
          <p v-else>{{ mes.username }}: {{ mes.message }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <input type="text" v-model="user" placeholder="Введите ваше имя" />
    <button @click="connect">Войти</button>
  </div>
</template>
