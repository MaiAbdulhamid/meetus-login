'use client'

import { create } from 'zustand'
import { UserInfo } from '@/types/auth'
import {
  getToken,
  saveToken,
  removeToken,
  saveUser,
  getUser,
} from '@/utils/token'
import { getUserInfo } from '@/lib/api/auth'

interface AuthStore {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  setAuth: (token: string, user: UserInfo) => void
  logout: () => void
  checkAuth: () => Promise<boolean>
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (token, user) => {
    saveToken(token)
    saveUser(user)
    set({ token, user, isAuthenticated: true, isLoading: false })
  },

  logout: () => {
    removeToken()
    set({ token: null, user: null, isAuthenticated: false, isLoading: false })
  },

  checkAuth: async () => {
    const token = getToken()
    const savedUser = getUser()

    if (!token) {
      set({ isLoading: false, isAuthenticated: false })
      return false
    }

    try {
      const user = await getUserInfo(token)
      saveUser(user)
      set({ token, user, isAuthenticated: true, isLoading: false })
      return true
    } catch {
      removeToken()
      set({ token: null, user: null, isAuthenticated: false, isLoading: false })
      return false
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },
}))
