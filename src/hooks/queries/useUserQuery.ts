import { useQuery } from '@tanstack/react-query'

import { fetchUserData } from 'services/user'

const useUserQuery = () => {
  const queryKey = ['user']

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserData()
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    user: data,
    ...rest
  }
}

export { useUserQuery }
