interface CommentRequest {
  content: string
  postId?: string
}
interface DeleteCommentRequest {
  commentId: string
  postId: string
}
interface UpdateCommentRequest {
  content: string
  postId: string
  commentId: string
}
interface LikeRequest {
  commentId: string
  postId: string
}
interface IComment {
  content: string
  createdAt: string
  id: number
  likes: User[] | null
  user: User
}