import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { useRegisterMutation } from 'hooks/mutations/useRegisterMutation'

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<RegisterRequest>({ mode: 'onBlur' })
  const { registerUser, isPending } = useRegisterMutation()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<RegisterRequest> = (loginRequest) => {
    registerUser(loginRequest)
  }

  return (
    <Flex
      alignItems={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      justifyContent={'center'}
      minHeight={'calc(100vh - 100px)'}
    >
      <Stack
        alignItems={'center'}
        as={'form'}
        justifyContent={'center'}
        maxW={'full'}
        mx={'auto'}
        w={{ base: 'full', sm: 'md', md: 'lg' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack align={'center'} mb={2}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          rounded={'lg'}
          w={'full'}
        >
          <Stack spacing={4}>
            <FormControl isRequired id='full_name' isInvalid={Boolean(errors.full_name)}>
              <FormLabel>Nombre</FormLabel>
              <Input
                autoComplete='off'
                type='text'
                {...register('full_name', {
                  required: { value: true, message: 'name es requerido' },
                  minLength: {
                    value: 4,
                    message: 'name debe tener al menos 4 caracteres'
                  }
                })}
              />
              <FormErrorMessage>{errors.full_name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              id='username'
              isInvalid={Boolean(errors.username)}
            >
              <FormLabel>Username</FormLabel>
              <Input
                autoComplete='off'
                type='text'
                {...register('username', {
                  required: { value: true, message: 'username es requerido' },
                  minLength: {
                    value: 4,
                    message: 'username debe tener al menos 4 caracteres'
                  }
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              id='password'
              isInvalid={Boolean(errors.password)}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  autoComplete='off'
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: { value: true, message: 'password es requerido' },
                    minLength: {
                      value: 4,
                      message: 'password debe tener al menos 4 caracteres'
                    }
                  })}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => {
                      setShowPassword((showPassword) => !showPassword)
                    }}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id='email' isInvalid={Boolean(errors.email)}>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete='off'
                type='email'
                {...register('email', {
                  required: { value: true, message: 'email es requerido' },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'email no es válido'
                  }
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired id='birth_date' isInvalid={Boolean(errors.birth_date)}>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Input
                autoComplete='off'
                type='date'
                {...register('birth_date', {
                  required: { value: true, message: 'fecha de nacimiento es requerida' }
                })}
              />
              <FormErrorMessage>{errors.birth_date?.message}</FormErrorMessage>
            </FormControl>
            <Stack pt={2} spacing={10}>
              <Button
                _hover={{
                  bg: 'blue.500'
                }}
                bg={'blue.400'}
                color={'white'}
                isDisabled={!isValid}
                isLoading={isSubmitting || isPending}
                loadingText='Signing in'
                size='lg'
                type='submit'
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link as={NavLink} color={'blue.400'} to='/login'>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
