import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchRemoveLikeToPost } from 'services/posts'

const useRemoveLikeMutation = (postId: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['remove-like']

  const mutationFn = async () => {
    return await fetchRemoveLikeToPost(postId)
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['postsLiked'] })
  }

  const { mutate: removeLike, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess,
    onError: (error) => {
      console.dir(error)
    }
  })

  return { removeLike, ...rest }
}

export { useRemoveLikeMutation }
