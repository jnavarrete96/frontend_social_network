import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea
} from '@chakra-ui/react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { UserAuthenticatedLogo } from './UserAuthenticatedLogo'

import { UserLogo } from 'components/ui'
import { useCreatePostMutation } from 'hooks/mutations/useCreatePostMutation'
import { useAppStore } from 'store/useAppStore'
interface Props {}

interface PostRequest {
  content: string
}

export function CreatePost(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<PostRequest>({ mode: 'onBlur' })

  const { addPost, isPending } = useCreatePostMutation()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  const onSubmit: SubmitHandler<PostRequest> = (postData: PostRequest) => {
    addPost(postData, {
      onSuccess: () => {
        reset() // Limpiar formulario solo si es exitoso
      }
    })
  }

  return (
    <Box
      as="form"
      backgroundColor="gray.700"
      borderRadius="12px"
      minHeight="155px"
      paddingX="20px"
      paddingY="12px"
      width="100%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text fontWeight="bold" paddingBottom="8px">
        Tweet something
      </Text>
      <Divider marginBottom="8px" />
      <Box marginBottom="16px" position="relative">
        <UserAuthenticatedLogo
          imageSize="40"
          left="8px"
          position="absolute"
          top="8px"
        />
        <FormControl
          isRequired
          id="content"
          isInvalid={Boolean(errors.content)}
        >
          <Textarea
            paddingLeft="58px"
            placeholder="What's happening?"
            resize="vertical"
            variant="unstyled"
            {...register('content', {
              required: {
                value: true,
                message: 'El contenido es requerido'
              },
              minLength: {
                value: 4,
                message: 'El tweet debe tener 4 o más caracteres'
              },
              maxLength: {
                value: 280,
                message: 'El tweet no puede exceder 280 caracteres'
              }
            })}
          />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="end">
        <Button
          colorScheme="blue" 
          isDisabled={!isValid || isPending} 
          isLoading={isPending}
          loadingText="Publishing..."
          size="md"
          type="submit"
        >
          Tweet
        </Button>
      </Box>
    </Box>
  )
}
