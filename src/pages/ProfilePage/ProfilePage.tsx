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
        <Outlet />
      </ProfileContainer>
    </ProfileLayout>
  )
}
