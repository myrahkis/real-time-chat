<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MessageInput from '@/components/MessageInput.vue'
import ChatDisplay from '@/components/ChatDisplay.vue'

const store = useStore()

onMounted(() => {
  document.title = `Чат: ${store.state.user}`
})
</script>

<template>
  <MessageInput />
  <ChatDisplay />
</template>
