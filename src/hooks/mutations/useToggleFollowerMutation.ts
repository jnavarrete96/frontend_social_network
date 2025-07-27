import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchAddFollower, fetchRemoveFollower } from 'services/user'

const useToggleFollowerMutation = (username: string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['toggle-follow']

  const { mutate: toggleFollow, ...rest } = useMutation({
    mutationKey,
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        return await fetchRemoveFollower(username)
      }

      return await fetchAddFollower(username)
    },
    onSuccess: () => {
      toast.success('Follow updated', {
        id: 'toggle-follow',
        position: 'bottom-left'
      })
      queryClient.invalidateQueries({ queryKey: ['users-following'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    },
    onError: (error) => {
      console.dir(error)
    }
  })

  return { toggleFollow, ...rest }
}

export { useToggleFollowerMutation }
