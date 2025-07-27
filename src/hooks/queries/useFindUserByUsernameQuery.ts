import { useQuery } from '@tanstack/react-query'

import { fetchFindUserByUsername } from 'services/user'

const useFindUserByUsernameQuery = (userId: string) => {
  const queryKey = [`profile/${userId}`]

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchFindUserByUsername(userId)
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
