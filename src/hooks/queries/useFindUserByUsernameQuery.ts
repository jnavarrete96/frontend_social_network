import { useQuery } from '@tanstack/react-query'

import { fetchFindUserByUsername } from 'services/user'

const useFindUserByUsernameQuery = (username: string) => {
  const queryKey = [`profile/${username}`]

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchFindUserByUsername(username)
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    userProfile: data,
    ...rest
  }
}

export { useFindUserByUsernameQuery }
