interface LoginRequest {
  identifier: string
  password: string
}
interface RegisterRequest {
  username: string
  password: string
  full_name: string
  description?: string
  email: string
  birth_date: string
}
interface AuthResponse {
  token: string
}
