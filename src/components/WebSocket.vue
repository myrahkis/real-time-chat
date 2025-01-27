<script setup>
import LoginPage from '@/pages/LoginPage.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const messages = computed(() => store.state.messages)
const connected = computed(() => store.state.connected)
const newMessage = computed(() => store.state.newMes)
const setNewMessage = (value) => store.commit('setNewMessage', value)
const sendMessage = () => store.dispatch('sendMessage')
const disconnect = () => store.dispatch('disconnect')
</script>

<template>
  <div v-if="connected">
    <div>
      <button @click="disconnect">exit</button>
      <input type="text" :value="newMessage" @input="setNewMessage($event.target.value)" />
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
  <LoginPage v-else />
</template>
