import {
  type MutationFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchEditPost } from 'services/posts'

const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['edit-post']
  const mutationFn: MutationFunction<
    Post,
    { postId: string; postRequest: PostRequest }
  > = async (variables) => {
    const { postId, postRequest } = variables

    return await fetchEditPost(postId, postRequest)
  }

  const { mutate: editPost, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      toast.success('Post edited', {
        id: 'edit-post-success',
        position: 'bottom-left'
      })
      queryClient.invalidateQueries({ queryKey: ['postsCreated'] })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return { editPost, ...rest }
}

export { useUpdatePostMutation }
