// services/likes.ts
import { protectedLikeInstance } from 'api/axiosInstances'

interface ToggleLikeResponse {
  liked: boolean
}

interface CountLikesResponse {
  postId: string
  likes: number
}

const fetchToggleLike = async (postId: string): Promise<ToggleLikeResponse> => {
  const response = await protectedLikeInstance.post<ToggleLikeResponse>(`/like/${postId}`)

  return response.data
}

const fetchCountLikes = async (postId: string): Promise<CountLikesResponse> => {
  const response = await protectedLikeInstance.get<CountLikesResponse>(`/like/${postId}`)

  return response.data
}

export { fetchToggleLike, fetchCountLikes }