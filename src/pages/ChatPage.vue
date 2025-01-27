<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const messages = computed(() => store.state.messages)
const newMessage = computed(() => store.state.newMes)
const setNewMessage = (value) => store.commit('setNewMessage', value)
const sendMessage = () => store.dispatch('sendMessage')
const disconnect = async () => {
  await store.dispatch('disconnect')
  router.push('/')
}
</script>

<template>
  <div>
    <button @click="disconnect">exit</button>
    <input type="text" :value="newMessage" @input="setNewMessage($event.target.value)" />
    <button @click="sendMessage">Send</button>
  </div>
  <div>
    <ul>
      <li v-for="mes in messages" :key="mes.id">
        <p v-if="mes.event === 'connection'">{{ mes.username }} вошел в чат</p>
        <p v-else-if="mes.event === 'disconnection'">{{ mes.username }} покинул чат</p>
        <p v-else :style="mes.isMine && {backgroundColor: 'red'}">{{ mes.username }}: {{ mes.message }}</p>
      </li>
    </ul>
  </div>
</template>
