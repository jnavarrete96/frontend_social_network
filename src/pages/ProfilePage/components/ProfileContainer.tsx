import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function ProfileContainer({ children }: Readonly<Props>) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      margin='auto'
      maxWidth={{ lg: '1073px' }}
      width={{ base: '95%' }}
    >
      {children}
    </Box>
  )
}
