import { create } from 'zustand'

interface TokenStore {
  token: string
  storeToken: (token: string) => void
  removeToken: () => void
}

export const useToken = create<TokenStore>((set) => ({
  token: JSON.parse(localStorage.getItem('access-token') || '""') || '',
  storeToken: (token) => {
    localStorage.setItem('access-token', JSON.stringify(token))
    set({ token })
  },
  removeToken: () => {
    localStorage.removeItem('access-token')
    set({ token: '' })
  }
}))
