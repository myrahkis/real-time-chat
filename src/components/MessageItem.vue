<script setup>
const { message } = defineProps({ message: Object })
</script>

<template>
  <p v-if="message.event === 'connection'">{{ message.username }} вошел в чат</p>
  <p v-else-if="message.event === 'disconnection'">{{ message.username }} покинул чат</p>
  <p v-else :style="message.isMine && { backgroundColor: 'red', textAlign: 'right' }">
    {{ message.username }}: {{ message.message }}
  </p>
</template>
