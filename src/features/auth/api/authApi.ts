import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../model/types'
import type { LoginInput, SignupInput } from '../model/validation'

export interface AuthApiError {
  message: string
}

interface AuthApiResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface StoredUser extends User {
  password: string
}

const USERS_KEY = 'auth_users'
const REFRESH_KEY = 'auth_refresh'

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (raw === null) return []
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublicUser(stored: StoredUser): User {
  return { id: stored.id, name: stored.name, email: stored.email, role: stored.role }
}

function makeTokens(): { accessToken: string; refreshToken: string } {
  const accessToken = `at_${crypto.randomUUID()}`
  const refreshToken = `rt_${crypto.randomUUID()}`
  localStorage.setItem(REFRESH_KEY, refreshToken)
  return { accessToken, refreshToken }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery<AuthApiError>(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, LoginInput>({
      queryFn: async ({ email, password }) => {
        await new Promise<void>((r) => setTimeout(r, 600))
        const found = readUsers().find((u) => u.email === email && u.password === password)
        if (!found) {
          return { error: { message: 'Invalid email or password' } }
        }
        const { accessToken, refreshToken } = makeTokens()
        return { data: { user: toPublicUser(found), accessToken, refreshToken } }
      },
    }),
    signup: builder.mutation<AuthApiResponse, SignupInput>({
      queryFn: async ({ name, email, password }) => {
        await new Promise<void>((r) => setTimeout(r, 600))
        const users = readUsers()
        if (users.some((u) => u.email === email)) {
          return { error: { message: 'Email already registered' } }
        }
        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          name,
          email,
          password,
          role: 'user',
        }
        writeUsers([...users, newUser])
        const { accessToken, refreshToken } = makeTokens()
        return { data: { user: toPublicUser(newUser), accessToken, refreshToken } }
      },
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
