import { Box, Icon } from '@chakra-ui/react'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { MdOutlineExplore } from 'react-icons/md'

import { ButtonIconContainer } from './ButtonIconContainer'

interface Props {}

export function Footer(props: Props) {
  return (
    <Box
      as='footer'
      backgroundColor='gray.700'
      bottom={0}
      columnGap='10px'
      display={{ base: 'flex', md: 'none' }}
      justifyContent='center'
      padding='13px'
      position='fixed'
      width='100%'
    >
      <ButtonIconContainer height='41px' width={{ base: '80px', md: '120px' }}>
        <Icon as={AiFillHome} boxSize={5} />
      </ButtonIconContainer>
      <ButtonIconContainer height='41px' width={{ base: '80px', md: '120px' }}>
        <Icon as={MdOutlineExplore} boxSize={6} />
      </ButtonIconContainer>
      <ButtonIconContainer height='41px' width={{ base: '80px', md: '120px' }}>
        <Icon as={BsBookmark} boxSize={5} />
      </ButtonIconContainer>
    </Box>
  )
}
