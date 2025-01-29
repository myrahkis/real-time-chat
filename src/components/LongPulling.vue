<script setup>
import axios from 'axios'
import { nextTick, onMounted, ref } from 'vue'

const messages = ref([])
const newMes = ref('')

onMounted(subscribe)

async function subscribe() {
  try {
    const res = await axios.get('http://localhost:5000/get-message')

    messages.value = [res.data, ...messages.value]

    await subscribe()
  } catch (err) {
    setTimeout(() => subscribe(), 500)
  }
}

async function sendMessage() {
  if (newMes.value === '') return

  try {
    await axios.post('http://localhost:5000/new-message', {
      message: newMes.value,
      id: Date.now(),
    })

    newMes.value = ''
  } catch (err) {
    console.error(err.message)
  }
}
</script>

<template>
  <div>
    <input type="text" v-model.trim="newMes" />
    <button @click="sendMessage">Send</button>
  </div>
  <div>
    <ul>
      <li v-for="mes in messages" :key="mes.id">
        {{ mes.message }}
      </li>
    </ul>
  </div>
</template>
