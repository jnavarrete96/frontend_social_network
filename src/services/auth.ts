import { publicUserInstance, publicAuthInstance } from 'api/axiosInstances'

const fetchLogin = async (loginRequest: LoginRequest) => {
  const response = await publicAuthInstance.post<AuthResponse>(
    '/auth/login',
    loginRequest
  )
  const AUTH_TOKEN = response.data.token

  return AUTH_TOKEN
}

const fetchRegister = async (data: RegisterRequest) => {
  const payload = {
    full_name: data.full_name,
    birth_date: data.birth_date,
    user_name: data.username,
    email: data.email,
    password: data.password
  }

  const response = await publicUserInstance.post('/users/register', payload)

  // Simplemente retornamos true/ok
  return response.status === 201
}

export { fetchLogin, fetchRegister }
