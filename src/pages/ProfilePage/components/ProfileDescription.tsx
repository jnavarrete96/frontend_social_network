import { Box, Button, Heading, Text, calc } from '@chakra-ui/react'
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useFindUserByUsernameQuery } from 'hooks/queries/useFindUserByUsernameQuery'
import { useToggleFollowerMutation } from 'hooks/mutations/useToggleFollowerMutation'
import { useFindAllFollowersQuery } from 'hooks/queries/useFindAllFollowersQuery'
import { useFindAllUsersFollowingQuery } from 'hooks/queries/useFindAllUsersFollowingQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ProfileDescription(props: Props) {
  const params = useParams()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  const { userProfile } = useFindUserByUsernameQuery(params.username as string)
  const { toggleFollow } = useToggleFollowerMutation(params?.username as string)
  const { followers, isPending } = useFindAllFollowersQuery(
    params?.username as string
  )
  const [isFollowing, setIsFollowing] = useState(false)
  const { usersFollowing } = useFindAllUsersFollowingQuery(
    params?.username as string
  )

  useEffect(() => {
    if (userAuthenticated === null || followers === undefined) {
      return
    }

    const isFollowing = followers.some(
      (follower) => follower.id === userAuthenticated.id
    )

    setIsFollowing(isFollowing)
  }, [userAuthenticated, followers])

  const handleFollow = () => {
    toggleFollow(isFollowing)
    setIsFollowing((prev) => !prev)
  }

  return (
    <Box
      backgroundColor='gray.700'
      borderRadius='12px'
      maxWidth='100%'
      minHeight={{ base: '246px', md: '163px' }}
      padding={{ base: '16px', md: '12px 24px' }}
      width='100%'
    >
      <Box
        alignItems={{ base: 'center', md: 'end' }}
        display='flex'
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
        flexWrap={{
          md: 'wrap'
        }}
        gap={{ md: 5 }}
        marginLeft={{ base: '0', md: 'auto' }}
        marginTop={{ base: '36px', md: 0 }}
        position='relative'
        width={{
          md: calc('100%').subtract('172px').toString()
        }}
      >
        <Box>
          <Heading display={'inline-block'} size='lg' textAlign='center'>
            {userProfile?.name}
          </Heading>{' '}
          <Text color={'gray.500'} display={'inline-block'} fontWeight={600}>
            @{userProfile?.username}
          </Text>
        </Box>

        <Box
          columnGap={5}
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          marginBottom={{ base: 5, md: 0 }}
          rowGap={1}
        >
          <Box display='flex' gap={1}>
            <Text as='span' fontWeight='bold'>
              {usersFollowing?.length ?? 0}
            </Text>
            <Text>Following</Text>
          </Box>
          <Box display='flex' gap={1}>
            <Text as='span' fontWeight='bold'>
              {followers?.length ?? 0}
            </Text>
            <Text> Followers</Text>
          </Box>
        </Box>
        <Text
          flexBasis={{
            md: '100%'
          }}
          marginBottom={{ base: 5, md: 0 }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          {userProfile?.description}
        </Text>
        {/* Agregar funcionalidad seguir usuarios */}
        {userAuthenticated?.username !== userProfile?.username && (
          <Button
            colorScheme='blue'
            isDisabled={isPending}
            isLoading={isPending}
            leftIcon={isFollowing ? <MdPersonRemove /> : <MdPersonAdd />}
            loadingText='Loading'
            position={{ lg: 'absolute' }}
            right={{ lg: 0 }}
            top={{ lg: '4px' }}
            variant={isFollowing ? 'outline' : 'solid'}
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </Box>
    </Box>
  )
}
