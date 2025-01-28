<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const disconnect = async () => {
  await store.dispatch('disconnect')
  router.push('/')
}
</script>

<template>
  <div class="header">
    <h2>Чат комната</h2>
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
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  color: var(--light-color);
  background-color: var(--red-color);
  padding: 0.5rem;
}
.exit-btn {
  padding: 1rem;
  background-color: transparent;
  margin-left: 0.8rem;
  transition: all 0.3s;

  svg {
    display: block;
    width: 3rem;
    height: 3rem;
    color: var(--light-color);
    stroke: var(--light-color);
    transition: all 0.3s;
  }

  &:focus {
    background-color: var(--green-color);
    color: var(--dark-color);
  }
  &:hover svg {
    /* color: var(--dark-color); */
    transform: scale(1.3);
  }
}
</style>
