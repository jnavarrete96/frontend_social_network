import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { fetchEditComment } from "services/comment"

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['edit-comment']

  const { mutate, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (commentEditRequest: UpdateCommentRequest) => {
      return await fetchEditComment(commentEditRequest)
    }, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Comment updated successfully', {
        id: "edit-comment",
        position: "bottom-right"
      })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return {
    updateComment: mutate,
    ...rest
  }
}
