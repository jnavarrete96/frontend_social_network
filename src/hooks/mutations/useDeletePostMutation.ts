import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchDeletePostById } from 'services/posts'

const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['delete-post']
  const mutationFn = fetchDeletePostById

  const { mutate: deletePost, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      toast.success('Post deleted', {
        id: 'delete-post-success',
        position: 'bottom-left'
      })
      queryClient.invalidateQueries({ queryKey: ['postsCreated'] })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return { deletePost, ...rest }
}

export { useDeletePostMutation }
