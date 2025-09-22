import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function initAuthListener() {
    const auth = getAuth()
    onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  }

  return { user, initAuthListener }
})
