import { Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { UserLogo } from 'components/ui'
import { useFindUserByUsernameQuery } from 'hooks/queries/useFindUserByUsernameQuery'

interface Props {}

export function ProfileImage(props: Props) {
  const params = useParams()
  const { userProfile } = useFindUserByUsernameQuery(params?.username as string)

  return (
    <Stack
      alignItems='center'
      backgroundColor='gray.800'
      borderRadius='8px'
      height={{
        base: '122px',
        md: '160px'
      }}
      justifyContent='center'
      left={{
        md: '24px'
      }}
      position='absolute'
      top={{
        base: '-80px',
        md: '-50px'
      }}
      width={{
        base: '122px',
        md: '160px'
      }}
    >
      <UserLogo
        border={'none'}
        borderRadius={'8px'}
        height={{
          base: '116px',
          md: '152px'
        }}
        imageSize='152'
        user={userProfile as User}
        width={{
          base: '116px',
          md: '152px'
        }}
      />
    </Stack>
  )
}
