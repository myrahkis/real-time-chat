<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

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
    <textarea type="text" :value="newMessage" @input="setNewMessage($event.target.value)" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style scoped>

</style>