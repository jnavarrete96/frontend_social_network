import { Box, Center, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { ProfileTweetList } from './ProfileTweetList'

import { usePostsLikedByUsernameQuery } from 'hooks/queries/usePostsLikedByUsernameQuery'

interface Props {}

export function PostsLikedList(props: Props): JSX.Element {
  const params = useParams()

  const { postsLiked, isLoading: isLoadingPostsLiked } =
    usePostsLikedByUsernameQuery(params?.username as string)

  return (
    <>
      {isLoadingPostsLiked ? (
        <Center
          display={'flex'}
          flexDirection={'column'}
          gap={'24px'}
          height={'100px'}
        >
          <Spinner size={'md'} />
        </Center>
      ) : (
        <Box
          alignItems='start'
          display='flex'
          flexDirection={{ base: 'column', md: 'row' }}
          gap={4}
          justifyContent='space-between'
        >
          {postsLiked?.length === 0 ? (
            <Box w={'full'}>
              <Center>No se encontraron posts</Center>
            </Box>
          ) : (
            <ProfileTweetList posts={postsLiked} />
          )}
        </Box>
      )}
    </>
  )
}
