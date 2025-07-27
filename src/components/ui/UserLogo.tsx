import { Avatar, type AvatarProps } from '@chakra-ui/react'

interface Props {
  imageSize: string
  user: UserProfile
}

export const UserLogo = ({ imageSize, user, ...rest }: AvatarProps & Props) => {
  // Genera iniciales del nombre completo del usuario
  const getInitials = (fullName: string | null | undefined) => {
    if (typeof fullName !== 'string' || fullName.trim().length === 0) {
      return '?'
    }
    
    const names = fullName.trim().split(' ')
    
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    
    // Primera letra del primer nombre + primera letra del último apellido
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(user?.full_name)
  const displayName =  user?.user_name 

  return (
    <Avatar
      alt='profile photo'
      borderRadius='8px'
      height={`${imageSize}px`}
      name={displayName}
      src={undefined}
      width={`${imageSize}px`}
      {...rest}
    >
      {initials}
    </Avatar>
  )
}