import { useQuery } from '@tanstack/react-query'

import { fetchAllPosts } from 'services/posts'

const usePostsQuery = () => {
  const queryKey = ['posts']
  const queryFn = fetchAllPosts

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    retry: false
  })

  return {
    posts: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export { usePostsQuery }
