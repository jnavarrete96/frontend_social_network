import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchToggleLike } from 'services/likes'


const useToggleLikeMutation = (postId: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['toggle-like', postId]
  const mutationFn = async () => await fetchToggleLike(postId)

  const { mutate: toggleLike, isPending, isError, error } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      // Invalidar el conteo de likes para este post específico
      queryClient.invalidateQueries({ queryKey: ['likes-count', postId] })
      
      // Opcional: También invalidar la lista de posts si incluye información de likes
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Error toggling like:', error)
    }
  })

  return { 
    toggleLike, 
    isPending, 
    isError, 
    error 
  }
}

export { useToggleLikeMutation }
