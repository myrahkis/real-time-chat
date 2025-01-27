<script setup>
const { message } = defineProps({ message: Object })
</script>

<template>
  <p class="entered" v-if="message.event === 'connection'">{{ message.username }} вошел в чат</p>
  <p class="leave" v-else-if="message.event === 'disconnection'">
    {{ message.username }} покинул чат
  </p>
  <p v-else :class="message.isMine ? 'myMes' : 'regMes'" class="not-my-mes">
    <span v-if="!message.isMine" class="other-username">{{ message.username }}:</span>
    <span>
      {{ message.message }}
    </span>
  </p>
</template>

<style scoped>
.entered,
.leave {
  text-align: center;
}

.myMes {
  width: fit-content;
  background-color: var(--base-pink-color);
  color: var(--light-color);
  float: right;
  border-radius: 1.8rem;
  padding: 1rem 1.5rem;
  border-bottom-right-radius: 0;
}
.regMes {
  width: fit-content;
  background-color: var(--red-color);
  border-radius: 1.8rem;
  padding: 1rem 1.5rem;
  border-bottom-left-radius: 0;
  color: var(--light-color);
}
.other-username {
  font-size: 1.6rem;
}
.not-my-mes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
