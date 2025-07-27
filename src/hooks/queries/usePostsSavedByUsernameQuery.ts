import { useQuery } from '@tanstack/react-query'

import { fetchAllPostsSavedByUsername } from 'services/posts'

const usePostsSavedByUsernameQuery = (username: string) => {
  const queryKey = ['postsSaved']

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAllPostsSavedByUsername(username)
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    postsSaved: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export { usePostsSavedByUsernameQuery }
