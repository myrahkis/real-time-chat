<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const newMessage = computed(() => store.state.newMes)
const setNewMessage = (value) => store.commit('setNewMessage', value)
const sendMessage = () => store.dispatch('sendMessage')
</script>

<template>
  <div class="input-wrapper">
    <textarea
      class="mes-input"
      type="text"
      :value="newMessage.trim()"
      @input="setNewMessage($event.target.value)"
      @keydown.enter="sendMessage"
    />
    <button class="send-btn" @click="sendMessage" @keydown.enter="sendMessage">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="1 0 22 22">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M 10 14 L 12.2728 19.3032 C 12.5856 20.0331 13.5586 20.1103 13.9486 19.4185 C 14.7183 18.0535 15.8591 15.8522 17 13 C 19 8 20 4 20 4 M 10 14 L 4.69678 11.7272 C 3.96687 11.4144 3.88975 10.4414 4.58149 10.0514 C 5.94647 9.28173 8.14784 8.14086 11 7 C 16 5 20 4 20 4 M 10 14 L 20 4"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--red-color);
  background-color: var(--light-color);
}
.mes-input {
  background-color: white;
  resize: horizontal;
  width: 100%;
  border: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: all 70ms;

  scrollbar-width: thin;
}
.send-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.2rem;
  font-size: 1.8rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: var(--base-pink-color);
  transition: all 0.2s;

  svg {
    display: block;
    width: 3.2rem;
    height: 3.2rem;
    color: var(--base-pink-color);
    stroke: var(--light-color);
    transition: all 0.2s;
  }

  &:hover svg {
    color: var(--red-color);
  }
  &:hover {
    background-color: var(--red-color);
  }
}
</style>
