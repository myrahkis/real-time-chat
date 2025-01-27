import { createStore } from 'vuex'

const store = createStore({
  //   namespaced: true,
  state: {
    messages: [],
    newMes: '',
    connected: false,
    user: '',
    socket: null,
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages
    },
    setNewMessage(state, newMes) {
      state.newMes = newMes
    },
    setConnected(state, bool) {
      state.connected = bool
    },
    setUser(state, username) {
      state.user = username
    },
    setSocket(state, socket) {
      state.socket = socket
    },
  },
  actions: {
    connect({ state, commit }) {
      const newSocket = new WebSocket('ws://localhost:5000')
      commit('setSocket', newSocket)

      // В момент подключения
      state.socket.onopen = () => {
        console.log('Подключение установлено...')
        commit('setConnected', true)

        const message = {
          event: 'connection',
          username: state.user,
          id: Date.now(),
        }

        state.socket.send(JSON.stringify(message))
      }
      state.socket.onmessage = (event) => {
        const message = JSON.parse(event.data)

        commit('setMessages', [message, ...state.messages])
      }
      state.socket.onclose = () => {
        console.log('Socket закрыт')
        commit('setConnected', false)
      }
      state.socket.onerror = () => {
        console.log('Socket произошла ошибка')
      }
    },
    disconnect({ state, commit }) {
      if (!state.socket) return

      state.socket.close()
      console.log('Отключение...')
      commit('setSocket', null)
      commit('setConnected', false)
    },
    async sendMessage({ state, commit }) {
      const message = {
        event: 'message',
        username: state.user,
        message: state.newMes,
        id: Date.now(),
      }

      state.socket.send(JSON.stringify(message))

      commit('setNewMessage', '')
    },
  },
})

export default store
