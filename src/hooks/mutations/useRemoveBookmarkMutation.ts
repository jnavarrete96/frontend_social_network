import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchRemovePostFromPostsSaved } from 'services/posts'

const useRemoveBookmarkMutation = (postId: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['remove-bookmark']

  const mutationFn = async () => {
    return await fetchRemovePostFromPostsSaved(postId)
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['postsSaved'] })
  }

  const { mutate: removeBookmark, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess,
    onError: (error) => {
      console.dir(error)
    }
  })

  return { removeBookmark, ...rest }
}

export { useRemoveBookmarkMutation }
