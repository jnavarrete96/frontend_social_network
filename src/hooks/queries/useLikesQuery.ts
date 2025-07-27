import { useQuery } from '@tanstack/react-query'

import { fetchCountLikes } from 'services/likes'

const useLikesCountQuery = (postId: string) => {
  const queryKey = ['likes-count', postId]
  const queryFn = async () => await fetchCountLikes(postId)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
  })

  return {
    likesData: data,
    likesCount: data?.likes ?? 0,
    isLoadingLikes: isLoading,
    isErrorLikes: isError,
    errorLikes: error,
    refetchLikes: refetch
  }
}

export { useLikesCountQuery }