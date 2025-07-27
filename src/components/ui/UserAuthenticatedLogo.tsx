import { Avatar, type AvatarProps } from '@chakra-ui/react'

import { useUserAuthenticatedImages } from 'hooks/useUserAuthenticatedImages'

interface Props {
  imageSize: string
}

export const UserAuthenticatedLogo = ({
  imageSize,
  ...rest
}: AvatarProps & Props) => {
  const { profileImageUserAuthenticatedUrl } = useUserAuthenticatedImages()

  return (
    <Avatar
      alt='profile photo'
      borderRadius='8px'
      height={`${imageSize}px`}
      src={profileImageUserAuthenticatedUrl}
      width={`${imageSize}px`}
      {...rest}
    />
  )
}
