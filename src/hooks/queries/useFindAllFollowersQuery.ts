import { useQuery } from '@tanstack/react-query'

import { fetchAllFollowersByUsername } from 'services/user';

const useFindAllFollowersQuery = (username: string) => {
  const queryKey = ["followers"]

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAllFollowersByUsername(username)
    },
    retry: false,
  })

  return {
    followers: data,
    ...rest
  }
}

export { useFindAllFollowersQuery }
