<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const setUser = (value) => store.commit('setUser', value)
const username = computed(() => store.state.user)
const connect = async () => {
  await store.dispatch('connect')
  router.push('/chat')
}
</script>

<template>
  <div class="container">
    <h1 style="color: var(--red-color)">Введите имя, чтобы войти в чат</h1>
    <div class="input-wrapper">
      <input
        class="name-input"
        type="text"
        :value="username"
        @input="setUser($event.target.value)"
        @keydown.enter="connect"
        placeholder="Ваше имя"
      />
      <button class="login-btn" @click="connect" @keydown.enter="connect">Войти</button>
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.name-input {
  width: 71%;
  max-width: 71%;
  font-size: 2rem;
}
.login-btn {
  width: 28%;
  max-width: 28%;
  font-size: 2rem;
  background-color: var(--base-pink-color);
  color: var(--dark-color);
  transition: all 0.3s;
  box-shadow: 0 0 0.2rem var(--red-color);

  &:hover {
    background-color: var(--red-color);
    color: var(--green-color)
  }
}
</style>
