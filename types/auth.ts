export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refresh: string
}

export interface UserInfo {
  id: number
  name: string
}

export interface AuthState {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
