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
  <div class="page-containter">
    <MessageInput />
    <ChatDisplay />
  </div>
</template>

<style scoped>
.page-containter {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 100vh;
  width: 55vw;
  border: 6px solid var(--green-color);
  border-bottom: none;
}
</style>
