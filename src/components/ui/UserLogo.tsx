import { Avatar, type AvatarProps } from '@chakra-ui/react'

import { useUserImages } from 'hooks/useUserImages'

interface Props {
  imageSize: string
  user: UserProfile
}

export const UserLogo = ({ imageSize, user, ...rest }: AvatarProps & Props) => {
  const { userLogoUrl } = useUserImages(user?.user_name)

  return (
    <Avatar
      alt='profile photo'
      borderRadius='8px'
      height={`${imageSize}px`}
      src={userLogoUrl}
      width={`${imageSize}px`}
      {...rest}
    />
  )
}
