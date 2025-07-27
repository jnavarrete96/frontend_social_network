import { useQuery } from '@tanstack/react-query'

import { fetchAllUsers } from 'services/user'

const useUsersQuery = () => {
  const queryKey = ['users']
  const queryFn = fetchAllUsers

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn,
    retry: false
  })

  return {
    users: data,
    ...rest
  }
}

export { useUsersQuery }
