import { Avatar, type AvatarProps } from '@chakra-ui/react'

interface Props {
  imageSize: string
}

export const UserAuthenticatedLogo = ({
  imageSize,
  ...rest
}: AvatarProps & Props) => {

  return (
    <Avatar
      alt='profile photo'
      borderRadius='8px'
      height={`${imageSize}px`}
      src={undefined}
      width={`${imageSize}px`}
      {...rest}
    />
  )
}
