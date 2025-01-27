<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MessageItem from './MessageItem.vue'

const store = useStore()

const messages = computed(() => store.state.messages)
</script>

<template>
  <ul class="display">
    <li v-for="mes in messages" :key="mes.id" class="message">
      <MessageItem :message="mes" />
    </li>
  </ul>
</template>

<style scoped>
.display {
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 2rem 1rem;
  gap: 0.8rem;

  scrollbar-width: thin;
  scrollbar-gutter: both;
  scrollbar-color: var(--green-color) var(--light-color);
}
/* .message {} */
</style>
