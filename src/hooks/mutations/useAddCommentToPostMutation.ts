import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchAddCommentToPost } from "services/comment"

const useAddCommentToPostMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['add-comment']

  const { mutate: addComment, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (commentRequest: CommentRequest) => {
      return await fetchAddCommentToPost(commentRequest.postId as string, commentRequest)
    }, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }

    ,
    onError: (error) => {
      console.dir(error)
    }
  })

  return {
    addComment,
    ...rest
  }
}

export { useAddCommentToPostMutation }