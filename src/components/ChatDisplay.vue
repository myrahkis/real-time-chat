<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MessageItem from './MessageItem.vue'

const store = useStore()

const messages = computed(() => store.state.messages)
</script>

<template>
  <ul>
    <li v-for="mes in messages" :key="mes.id">
      <MessageItem :message="mes" />
    </li>
  </ul>
</template>
