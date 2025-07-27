import { useQuery } from '@tanstack/react-query'

import { fetchAllPostsLikedByUsername } from 'services/posts'

const usePostsLikedByUsernameQuery = (username: string) => {
  const queryKey = ['postsLiked']

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAllPostsLikedByUsername(username)
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    postsLiked: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export { usePostsLikedByUsernameQuery }
