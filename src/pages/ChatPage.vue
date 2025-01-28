<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MessageInput from '@/components/MessageInput.vue'
import ChatDisplay from '@/components/ChatDisplay.vue'
import ChatHeader from '@/components/ChatHeader.vue'

const store = useStore()

onMounted(() => {
  document.title = `Чат: ${store.state.user}`
})
</script>

<template>
  <div class="page-containter">
    <ChatHeader />
    <ChatDisplay />
    <MessageInput />
  </div>
</template>

<style scoped>
.page-containter {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95vh;
  width: 50vw;
  border-radius: 1.5rem;
  /* border: 6px solid var(--green-color); */
  border-bottom: none;
  box-shadow: 0 0 0.8rem var(--dark-color);
}
</style>
