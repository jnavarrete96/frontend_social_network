import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchCreateOnePost } from 'services/posts'

const useCreatePostMutation = () => {
  const queryClient = useQueryClient()
  const mutationKey = ['create-post']
  const mutationFn = fetchCreateOnePost

  const { mutate: addPost, isPending, isError, error } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (newPost: SimplePost) => {
      toast.success('Post created successfully', {
        id: 'create-post',
        position: 'bottom-left'
      })
      
      // Invalidar queries para refrescar la lista de posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      // Opcional: Agregar el nuevo post directamente al cache para mejor UX
      queryClient.setQueryData(['posts'], (oldPosts: SimplePost[] | undefined) => {
        if (oldPosts == null) return [newPost]
        
        return [newPost, ...oldPosts] // Agregar el nuevo post al inicio
      })
    },
    onError: (error) => {
      console.dir(error)
      toast.error('Error creating post', {
        id: 'create-post-error',
        position: 'bottom-left'
      })
    }
  })

  return { 
    addPost, 
    isPending, 
    isError, 
    error 
  }
}

export { useCreatePostMutation }
