import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchUpdateUser } from 'services/user'

const useUpdateUserMutation = (username: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['edit-user']

  const { mutate: updateUser, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (updateUserRequest: UpdateUserRequest) => {
      return await fetchUpdateUser(username, updateUserRequest)
    },
    onSuccess: () => {
      toast.success('User updated successfully', {
        id: 'edit-user',
        position: 'bottom-left'
      })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return { updateUser, ...rest }
}

export { useUpdateUserMutation }
