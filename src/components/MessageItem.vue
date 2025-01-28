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
  background-color: var(--secondary-color);
  width: fit-content;
  color: var(--light-color);
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.myMes {
  width: fit-content;
  max-width: 45%;
  word-wrap: break-word;
  background-color: var(--base-pink-color);
  color: var(--dark-color);
  float: right;
  border: 2px solid #c6426a;
  border-radius: 1.8rem;
  padding: 1rem 1.5rem;
  border-bottom-right-radius: 0;
  font-size: 1.5rem;
}
.regMes {
  width: fit-content;
  max-width: 45%;
  word-wrap: break-word;
  background-color: var(--red-color);
  border-radius: 1.8rem;
  padding: 1rem 1.5rem;
  border: 2px solid var(--secondary-color);
  border-bottom-left-radius: 0;
  color: var(--dark-color);
  font-size: 1.5rem;
}
.other-username {
  font-size: 1.3rem;
}
.not-my-mes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
