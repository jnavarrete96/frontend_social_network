import { useQuery } from '@tanstack/react-query'

import { fetchAllPostsCreatedByUsername } from 'services/posts'

const usePostsCreatedByUsernameQuery = (username: string) => {
  const queryKey = ['postsCreated']

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAllPostsCreatedByUsername(username)
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    postsCreated: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export { usePostsCreatedByUsernameQuery }
