import { protectedInstance, protectedPostInstance } from 'api/axiosInstances'

const fetchAllPosts = async () => {
  const response = await protectedPostInstance.get<SimplePost[]>('/post')
  const posts = response.data

  return posts
}

const fetchCreateOnePost = async (postRequest: PostRequest) => {
  const response = await protectedPostInstance.post<SimplePost>('/post', postRequest)
  const post = response.data

  return post
}

const fetchDeletePostById = async (postId: string) => {
  await protectedInstance.delete(`/posts/${postId}`)
}

const fetchEditPost = async (postId: string, postRequest: PostRequest) => {
  const response = await protectedInstance.patch<Post>(
    `/posts/${postId}`,
    postRequest
  )
  const postUpdated = response.data

  return postUpdated
}

const fetchRemoveLikeToPost = async (postId: string) => {
  const response = await protectedInstance.patch<Post>(
    `/posts/${postId}/removeLike`
  )
  const postUpdated = response.data

  return postUpdated
}

const fetchAddLikeToPost = async (postId: string) => {
  const response = await protectedInstance.patch<Post>(`/posts/${postId}/like`)
  const postUpdated = response.data

  return postUpdated
}

const fetchAddPostToPostsSaved = async (postId: string) => {
  const response = await protectedInstance.patch<Post>(
    `/posts/${postId}/savePost`
  )
  const postUpdated = response.data

  return postUpdated
}

const fetchRemovePostFromPostsSaved = async (postId: string) => {
  const response = await protectedInstance.patch<Post>(
    `/posts/${postId}/removePostSaved`
  )
  const postUpdated = response.data

  return postUpdated
}

const fetchAllPostsCreatedByUsername = async (username: string) => {
  const response = await protectedInstance.get<SimplePost[]>(
    `/posts/username/${username}/postsCreated`
  )
  const postsCreated = response.data

  return postsCreated
}
const fetchAllPostsLikedByUsername = async (username: string) => {
  const response = await protectedInstance.get<Post[]>(
    `/posts/username/${username}/postsLiked`
  )
  const postsLiked = response.data

  return postsLiked
}
const fetchAllPostsSavedByUsername = async (username: string) => {
  const response = await protectedInstance.get<Post[]>(
    `/posts/username/${username}/postsSaved`
  )
  const postsSaved = response.data

  return postsSaved
}

export {
  fetchAllPosts,
  fetchCreateOnePost,
  fetchDeletePostById,
  fetchEditPost,
  fetchAddLikeToPost,
  fetchRemoveLikeToPost,
  fetchAddPostToPostsSaved,
  fetchRemovePostFromPostsSaved,
  fetchAllPostsCreatedByUsername,
  fetchAllPostsLikedByUsername,
  fetchAllPostsSavedByUsername
}
