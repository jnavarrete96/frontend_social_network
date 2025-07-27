interface Post {
  id: number
  content: string
  createdAt: string
  user: User
  likedByUsers: User[]
  savedByUsers: User[]
  comments: IComment[]
}

interface SimplePost {
  id: string
  content: string
  created_at: string
  author: {
    full_name: string
    user_name: string
  }
}

interface PostRequest {
  content: string
}
