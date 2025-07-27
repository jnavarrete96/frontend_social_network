import { Box, Center, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { ProfileTweetList } from './ProfileTweetList'

import { usePostsCreatedByUsernameQuery } from 'hooks/queries/usePostsCreatedByUsernameQuery'

interface Props {}

export function PostsCreatedList(props: Props): JSX.Element {
  const params = useParams()
  const { postsCreated, isLoading: isLoadingPostsCreated } =
    usePostsCreatedByUsernameQuery(params?.username as string)

  return (
    <>
      {isLoadingPostsCreated ? (
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
          {postsCreated?.length === 0 ? (
            <Box w={'full'}>
              <Center>No se encontraron posts</Center>
            </Box>
          ) : (
            <ProfileTweetList showCrudButtons posts={postsCreated} />
          )}
        </Box>
      )}
    </>
  )
}
