import { createStore } from 'vuex'

const store = createStore({
  //   namespaced: true,
  state: {
    messages: [],
    newMes: '',
    connected: false,
    user: '',
    socket: null,
    userId: null,
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
    setUserId(state, id) {
      state.userId = id
    },
  },
  actions: {
    // userIdToStorage({ state, commit }) {
    //   const userId = localStorage.getItem('userId') || Date.now().toString()

    //   localStorage.setItem('userId', userId)

    //   commit('setUserId', userId)
    // },
    markMyMessages({ state, commit }) {
      const markedMessages = state.messages.map((mes) =>
        mes.userId === state.userId ? { ...mes, isMine: true } : mes,
      )
      commit('setMessages', markedMessages)
    },
    async connect({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        const newSocket = new WebSocket('wss://real-time-chat-opwl.onrender.com/')
        commit('setSocket', newSocket)

        // В момент подключения
        state.socket.onopen = () => {
          commit('setConnected', true)

          const message = {
            event: 'connection',
            username: state.user,
            id: Date.now(),
          }

          state.socket.send(JSON.stringify(message))

          resolve()
        }
        state.socket.onmessage = (event) => {
          const message = JSON.parse(event.data)

          if (message.event === 'assignId' && state.userId === null) {
            commit('setUserId', message.userId)
          }

          if (message.event !== 'assignId') {
            commit('setMessages', [message, ...state.messages])
          }

          dispatch('markMyMessages')
        }
        state.socket.onclose = () => {
          commit('setConnected', false)
        }
        state.socket.onerror = () => {
          console.error('Socket произошла ошибка')
        }
      })
    },
    async disconnect({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (!state.socket) return

        const message = {
          event: 'disconnection',
          username: state.user,
          id: Date.now(),
        }

        state.socket.send(JSON.stringify(message))
        commit('setMessages', [message, ...state.messages])

        state.socket.close()
        commit('setSocket', null)
        commit('setConnected', false)
        commit('setUserId', null)
        resolve()
      })
    },
    async sendMessage({ state, commit }) {
      if (state.newMes.trim() === '') return

      const message = {
        event: 'message',
        username: state.user,
        message: state.newMes,
        id: Date.now(),
      }

      state.socket.send(JSON.stringify(message))

      commit('setNewMessage', null)
    },
  },
})

export default store
