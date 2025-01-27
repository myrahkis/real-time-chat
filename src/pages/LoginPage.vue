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
  <input
    type="text"
    :value="username"
    @input="setUser($event.target.value)"
    placeholder="Введите ваше имя"
  />
  <button @click="connect">Войти</button>
</template>
