import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '../model/types'

const USER_KEY = 'auth_user'
const TOKEN_KEY = 'auth_token'

interface CredentialsPayload {
  user: User
  accessToken: string
}

function loadState(): AuthState {
  try {
    const raw = localStorage.getItem(USER_KEY)
    const token = localStorage.getItem(TOKEN_KEY)
    if (raw !== null && token !== null) {
      const user = JSON.parse(raw) as User
      return { user, accessToken: token, isAuthenticated: true }
    }
  } catch {
    // ignore corrupted storage
  }
  return { user: null, accessToken: null, isAuthenticated: false }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
      localStorage.setItem(TOKEN_KEY, action.payload.accessToken)
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('auth_refresh')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer