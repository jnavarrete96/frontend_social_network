import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  InputGroup
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { useLoginMutation } from 'hooks/mutations/useLoginMutation'

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<LoginRequest>({ mode: 'onBlur' })
  const [showPassword, setShowPassword] = useState(false)
  const { login, isPending } = useLoginMutation()

  const onSubmit: SubmitHandler<LoginRequest> = async (loginRequest) => {
    login(loginRequest)
  }

  return (
    <Flex
      alignItems={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      justifyContent={'center'}
      minH={'calc(100vh - 100px)'}
    >
      <Stack
        as={'form'}
        maxW={'full'}
        mx={'auto'}
        w={{ base: 'full', sm: 'md', md: 'lg' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack align={'center'} mb={2}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          maxW={'full'}
          p={8}
          rounded={'lg'}
          w={{ base: 'full', sm: 'md', md: 'lg' }}
        >
          <Stack spacing={4}>
            <FormControl
              isRequired
              id='identifier'
              isInvalid={Boolean(errors.identifier)}
            >
              <FormLabel>Username or Email</FormLabel>
              <Input
                autoComplete='off'
                type='text'
                {...register('identifier', {
                  required: { value: true, message: 'Username or email is required' },
                  minLength: {
                    value: 4,
                    message: 'Must be at least 4 characters'
                  }
                })}
              />
              <FormErrorMessage>{errors.identifier?.message}</FormErrorMessage>
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
                    required: {
                      value: true,
                      message: 'password es requerido'
                    },
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
            <Stack spacing={10}>
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
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account?{' '}
                <Link as={NavLink} color={'blue.400'} to='/register'>
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
