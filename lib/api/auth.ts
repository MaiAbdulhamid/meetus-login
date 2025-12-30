import { LoginCredentials, LoginResponse, UserInfo } from '@/types/auth'

const BASE_URL = 'https://api-yeshtery.dev.meetusvr.com/v1'

export async function loginApi(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/yeshtery/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      orgId: 2,
      isEmployee: false,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Invalid credentials')
  }

  return response.json()
}

export async function getUserInfo(token: string): Promise<UserInfo> {
  const response = await fetch(`${BASE_URL}/user/info`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Unauthorized')
  }

  return response.json()
}
