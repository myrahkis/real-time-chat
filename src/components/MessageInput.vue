<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const newMessage = computed(() => store.state.newMes)
const setNewMessage = (value) => store.commit('setNewMessage', value)
const sendMessage = () => store.dispatch('sendMessage')
const disconnect = async () => {
  await store.dispatch('disconnect')
  router.push('/')
}
</script>

<template>
  <div class="input-wrapper">
    <textarea
      class="mes-input"
      type="text"
      :value="newMessage"
      @input="setNewMessage($event.target.value)"
      @keydown.enter="sendMessage"
    />
    <button class="send-btn" @click="sendMessage" @keydown.enter="sendMessage">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M 10 14 L 12.2728 19.3032 C 12.5856 20.0331 13.5586 20.1103 13.9486 19.4185 C 14.7183 18.0535 15.8591 15.8522 17 13 C 19 8 20 4 20 4 M 10 14 L 4.69678 11.7272 C 3.96687 11.4144 3.88975 10.4414 4.58149 10.0514 C 5.94647 9.28173 8.14784 8.14086 11 7 C 16 5 20 4 20 4 M 10 14 L 20 4"
        />
      </svg>
    </button>
    <button class="exit-btn" @click="disconnect">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M 9 4.5 H 8 C 5.64298 4.5 4.46447 4.5 3.73223 5.23223 C 3 5.96447 3 7.14298 3 9.5 V 14.5 C 3 16.857 3 18.0355 3.73223 18.7678 C 4.46447 19.5 5.64298 19.5 8 19.5 H 9"
        />
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M 9 6.4764 C 9 4.18259 9 3.03569 9.70725 2.4087 C 10.4145 1.78171 11.4955 1.97026 13.6576 2.34736 L 15.9864 2.75354 C 18.3809 3.17118 19.5781 3.37999 20.2891 4.25826 C 21 5.13652 21 6.40672 21 8.94711 V 15.0529 C 21 17.5933 21 18.8635 20.2891 19.7417 C 19.5781 20.62 18.3809 20.8288 15.9864 21.2465 L 13.6576 21.6526 C 11.4955 22.0297 10.4145 22.2183 9.70725 21.5913 C 9 20.9643 9 19.8174 9 17.5236 V 6.4764 Z"
        />
        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M 12 11 V 13" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  /* gap: 1.5rem; */
  padding: 2rem;
  background-color: var(--green-color);
}
.mes-input {
  background-color: var(--light-color);
  resize: horizontal;
  min-width: 45%;
  height: 6.5rem;
  border: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.send-btn {
  /* align-self: center; */
  font-size: 1.8rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: var(--base-pink-color);

  svg {
    display: block;
    width: 3rem;
    height: 3rem;
    color: var(--green-color);
    stroke: var(--green-color);
  }
}

.exit-btn {
  padding: 1rem;
  align-self: center;
  margin-left: 1rem;
  background-color: var(--light-color);

  svg {
    display: block;
    width: 3rem;
    height: 3rem;
    color: var(--green-color);
    stroke: var(--green-color);
  }
}
</style>
