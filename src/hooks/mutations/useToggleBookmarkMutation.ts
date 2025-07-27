import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  fetchAddPostToPostsSaved,
  fetchRemovePostFromPostsSaved
} from 'services/posts'

const useToggleBookmarkMutation = (postId: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['toggle-like']

  const mutationFn = async (isPostSavedInBookmarks: boolean) => {
    if (isPostSavedInBookmarks) {
      return await fetchRemovePostFromPostsSaved(postId)
    }

    return await fetchAddPostToPostsSaved(postId)
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    queryClient.invalidateQueries({ queryKey: ['postsCreated'] })
    queryClient.invalidateQueries({ queryKey: ['postsLiked'] })
    queryClient.invalidateQueries({ queryKey: ['postsSaved'] })
  }

  const { mutate: toggleBookmark, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess,
    onError: (error) => {
      console.dir(error)
    }
  })

  return { toggleBookmark, ...rest }
}

export { useToggleBookmarkMutation }
