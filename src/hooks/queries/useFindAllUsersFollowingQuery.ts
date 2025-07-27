import { useQuery } from '@tanstack/react-query'

import { fetchAllUsersFollowing } from 'services/user';

const useFindAllUsersFollowingQuery = (username: string) => {
  const queryKey = ["users-following"]

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAllUsersFollowing(username)
    },
    retry: false,
  })

  return {
    usersFollowing: data,
    ...rest
  }
}

export { useFindAllUsersFollowingQuery }
