import { Box } from '@chakra-ui/react'

import { SimplePostCard } from '../../../components/ui/TweetCard'

interface Props {
  posts: SimplePost[] | undefined
  showCrudButtons?: boolean
}

export function ProfileTweetList({
  posts,
  showCrudButtons = false
}: Readonly<Props>): JSX.Element {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'24px'} width={'100%'}>
      {posts !== undefined &&
        posts.length > 0 &&
        posts.map((post) => (
          <SimplePostCard
            key={post.id}
            showOptionsMenu
            post={post}
            showCrudButtons={showCrudButtons}
          />
        ))}
    </Box>
  )
}
