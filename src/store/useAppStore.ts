import { create } from 'zustand'

interface Store {
  userAuthenticated: UserProfile | null
  setUserAuthenticated: (userAuthenticated: UserProfile) => void
}

export const useAppStore = create<Store>((set) => ({
  userAuthenticated: null,
  setUserAuthenticated: (userAuthenticated: UserProfile) => {
    set((state) => ({ userAuthenticated }))
  }
}))
