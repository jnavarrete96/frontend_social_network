import { Box, Button } from '@chakra-ui/react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMemo } from 'react'

import { ProfileDescription, ProfileImage } from './components'
import { ProfileContainer } from './components/ProfileContainer'
import { ProfileLayout } from './layouts'

interface Props {}

export function ProfilePage(props: Props) {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const pathContainsPostsCreated = useMemo(() => {
    return pathname.includes('postsCreated')
  }, [pathname])
  const pathContainsPostsLiked = useMemo(() => {
    return pathname.includes('postsLiked')
  }, [pathname])

  return (
    <ProfileLayout>
      <ProfileContainer>
        <Box
          alignItems='center'
          display='flex'
          justifyContent='center'
          margin='auto'
          position='relative'
          top='-42px'
          width='100%'
        >
          <ProfileImage />
          <ProfileDescription />
        </Box>

        <Box display={'flex'} gap={'4'} marginBottom={'24px'}>
          <Button
            colorScheme='messenger'
            flexGrow={'1'}
            isActive={pathContainsPostsCreated}
            rounded={'full'}
            variant={'ghost'}
            onClick={() => {
              navigate(`/profile/${params?.username as string}/postsCreated`)
            }}
          >
            Tweets
          </Button>
          <Button
            colorScheme='messenger'
            flexGrow={'1'}
            isActive={pathContainsPostsLiked}
            rounded={'full'}
            variant={'ghost'}
            onClick={() => {
              navigate(`/profile/${params?.username as string}/postsLiked`)
            }}
          >
            Likes
          </Button>
        </Box>

        <Outlet />
      </ProfileContainer>
    </ProfileLayout>
  )
}
