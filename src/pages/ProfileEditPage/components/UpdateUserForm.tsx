import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useUpdateUserMutation } from 'hooks/mutations/useUpdateUserMutation'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function UpdateUserForm(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const {
    updateUser,
    data: userUpdated,
    isPending: isUpdatePending
  } = useUpdateUserMutation(userAuthenticated?.username as string)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setValue
  } = useForm<UpdateUserRequest>({
    mode: 'onBlur',
    defaultValues: {
      name: userAuthenticated?.name,
      description: userAuthenticated?.description
    }
  })

  if (userUpdated !== undefined) {
    setValue('name', userUpdated.name)
    setValue('description', userUpdated.description)
  }

  const onSubmit: SubmitHandler<UpdateUserRequest> = (
    updateUserRequest: UpdateUserRequest
  ) => {
    updateUser(updateUserRequest)
  }
  const onCancel = () => {
    setValue('name', userAuthenticated?.name)
    setValue('description', userAuthenticated?.description)
  }

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input
          _placeholder={{ color: 'gray.500' }}
          placeholder='Name'
          type='text'
          {...register('name', {
            minLength: {
              value: 4,
              message: 'name debe tener al menos 4 caracteres'
            }
          })}
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl id='description' isInvalid={Boolean(errors.description)}>
        <FormLabel>Description</FormLabel>
        <Input
          _placeholder={{ color: 'gray.500' }}
          placeholder='Description'
          type='text'
          {...register('description', {
            minLength: {
              value: 4,
              message: 'description debe tener al menos 4 caracteres'
            }
          })}
        />
        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
      </FormControl>
      <Stack direction={['column', 'row']} spacing={6}>
        <Button
          _hover={{
            bg: 'red.500'
          }}
          bg={'red.400'}
          color={'white'}
          w='full'
          onClick={() => {
            onCancel()
          }}
        >
          Cancel
        </Button>
        <Button
          _hover={{
            bg: 'blue.500'
          }}
          bg={'blue.400'}
          color={'white'}
          isDisabled={!isValid || isUpdatePending || !isDirty}
          isLoading={isUpdatePending || isSubmitting}
          loadingText={'Updating...'}
          type='submit'
          w='full'
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
