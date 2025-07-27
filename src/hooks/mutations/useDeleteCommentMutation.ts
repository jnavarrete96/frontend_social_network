import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchDeleteComment } from "services/comment"

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['delete-comment']

  const { mutate: deleteComment, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (deleteCommentRequest: DeleteCommentRequest) => {
      return await fetchDeleteComment(deleteCommentRequest)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return {
    deleteComment,
    ...rest
  }
}

export { useDeleteCommentMutation }