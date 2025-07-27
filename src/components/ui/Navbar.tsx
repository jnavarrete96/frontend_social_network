import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react'
import { AiFillCaretDown } from 'react-icons/ai'
import { NavLink, useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { UserAuthenticatedLogo } from './UserAuthenticatedLogo'

import { socialNetwork } from 'assets'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function Navbar(props: Props) {
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.setQueryData(['user'], null)
  }

  return (
    <Stack
      as='header'
      backgroundColor={'gray.900'}
      height='70px'
      justifyContent={'center'}
      paddingX='16px'
      position={'sticky'}
      top={'0'}
      zIndex={'100'}
    >
      <HStack justifyContent='space-between'>
        <HStack as={NavLink} to={''}>
          <Image alt='tweeter small' src={socialNetwork} width='41px' />
          <Heading size='md'>Social Network</Heading>
        </HStack>
        <HStack
          as='nav'
          display={{ base: 'none', md: 'flex' }}
          spacing={{ base: '0', md: '32px', lg: '64px', xl: '80px' }}
        >
          {Boolean(userAuthenticated) && (
            <Heading size='xs'>
              <Button
                as={NavLink}
                isActive={pathname === '/'}
                to='/'
                variant='link'
              >
                Home
              </Button>
            </Heading>
          )}
        </HStack>

        <Box display={'flex'}>
          {userAuthenticated != null ? (
            <Menu>
              <MenuButton>
                <HStack>
                  <UserAuthenticatedLogo imageSize='36' />
                  <Heading
                    display={{
                      base: 'none',
                      md: 'block'
                    }}
                    size='xs'
                    userSelect='none'
                  >
                    {userAuthenticated?.full_name}
                  </Heading>
                  <Icon
                    as={AiFillCaretDown}
                    display={{
                      base: 'none',
                      md: 'block'
                    }}
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={NavLink}
                  to={`/profile/${userAuthenticated?.id}`}
                >
                  My profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logout()
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Box display='flex' gap='16px'>
              <Button
                as={NavLink}
                isActive={pathname === '/login'}
                to='/login'
                variant='link'
              >
                Login
              </Button>
              <Button
                as={NavLink}
                isActive={pathname === '/register'}
                to='/register'
                variant='link'
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </HStack>
    </Stack>
  )
}
