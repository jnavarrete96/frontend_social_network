import { Button, type ButtonProps } from '@chakra-ui/react'

export function ButtonIconContainer({
  children,
  ...restProps
}: Readonly<ButtonProps>) {
  return (
    <Button variant='ghost' width={{ base: '50px', md: '65px' }} {...restProps}>
      {children}
    </Button>
  )
}
