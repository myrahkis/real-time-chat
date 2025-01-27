<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const setUser = (value) => store.commit('setUser', value)
const username = computed(() => store.state.user)
const connect = () => store.dispatch('connect')
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
