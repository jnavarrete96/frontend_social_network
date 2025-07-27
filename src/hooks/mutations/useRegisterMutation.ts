import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchRegister } from 'services/auth'

const useRegisterMutation = () => {
  const queryClient = useQueryClient()

  const { mutate: registerUser, ...rest } = useMutation({
    mutationKey: ['register'],
    mutationFn: fetchRegister,
    onSuccess: () => {
      toast.success('Registro exitoso', {
        id: 'register',
        position: 'bottom-left'
      })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: any) => {
      toast.error('Error al registrar usuario')
      console.error('Error en registro:', error)
    }
  })

  return { registerUser, ...rest }
}

export { useRegisterMutation }
