interface User {
  id: number
  name: string
  description: string | null
  username: string
  profileImage: string | null
  backgroundImage: string | null
}

interface UserProfile {
  id: string
  full_name: string
  birth_date: string
  user_name: string
  email: string
  created_at: string
  updated_at: string
}

interface UpdateUserRequest {
  name?: string
  description?: string
}
