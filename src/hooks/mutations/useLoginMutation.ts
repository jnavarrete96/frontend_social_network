import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { fetchLogin } from 'services/auth'

const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['login']
  const mutationFn = fetchLogin

  const { mutate: login, ...rest } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (token) => {
      toast.success('Login successfully', {
        id: 'login',
        position: 'bottom-left'
      })
      localStorage.setItem('AUTH_TOKEN', token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.dir(error)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.backendMessage ?? 'Login failed', {
          id: 'auth',
          position: 'bottom-left'
        })
      }
    }
  })

  return { login, ...rest }
}

export { useLoginMutation }
