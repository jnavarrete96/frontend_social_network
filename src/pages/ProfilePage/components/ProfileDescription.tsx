import { Box, Button, Heading, Text, calc, VStack, HStack } from '@chakra-ui/react'
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { useFindUserByUsernameQuery } from 'hooks/queries/useFindUserByUsernameQuery'
import { useToggleFollowerMutation } from 'hooks/mutations/useToggleFollowerMutation'
import { useAppStore } from 'store/useAppStore'

interface Props {}

const formatBirthday = (birthday: string | Date | null | undefined) => {
  if (birthday === null || birthday === undefined || birthday === '') {
    return 'No disponible'
  }
  
  const date = new Date(birthday)

  if (isNaN(date.getTime())) {
    return 'Fecha inválida'
  }
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  
  const day = date.getDate()
  const month = months[date.getMonth()]
  
  return `${day} de ${month}`
}

const calculateAge = (birthday: string | Date | null | undefined) => {
  if (birthday === null || birthday === undefined || birthday === '') {
    return 'No disponible'
  }
  
  const birthDate = new Date(birthday)

  if (isNaN(birthDate.getTime())) {
    return 'Fecha inválida'
  }
  
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return `${age} años`
}

export function ProfileDescription(props: Props) {
  const params = useParams()
  const { userProfile } = useFindUserByUsernameQuery(params.userId as string)

  return (
    <Box
      backgroundColor='gray.700'
      borderRadius='12px'
      maxWidth='100%'
      minHeight={{ base: '280px', md: '200px' }}
      padding={{ base: '16px', md: '12px 24px' }}
      width='100%'
    >
      <Box
        alignItems={{ base: 'center', md: 'start' }}
        display='flex'
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
        gap={{ base: 4, md: 6 }}
        marginLeft={{ base: '0', md: 'auto' }}
        marginTop={{ base: '36px', md: 0 }}
        position='relative'
        width={{
          md: calc('100%').subtract('172px').toString()
        }}
      >
        {/* Nombre y username */}
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Heading marginBottom={1} size='lg' >
            {userProfile?.full_name}
          </Heading>
          <Text color='gray.500' fontSize='md' fontWeight={600} >
            @{userProfile?.user_name}
          </Text>
        </Box>

        {/* Información personal */}
        <VStack 
          align={{ base: 'center', md: 'start' }} 
          flex={1}
          spacing={2}
        >
          {/* Edad */}
          <HStack spacing={2}>
            <Text color='blue.300' fontWeight='bold'>
              Edad:
            </Text>
            <Text>
              {calculateAge(userProfile?.birth_date)}
            </Text>
          </HStack>

          {/* Cumpleaños */}
          <HStack spacing={2}>
            <Text color='blue.300' fontWeight='bold'>
              Cumpleaños:
            </Text>
            <Text>
              {formatBirthday(userProfile?.birth_date)}
            </Text>
          </HStack>

          {/* Correo */}
          <HStack spacing={2}>
            <Text color='blue.300' fontWeight='bold'>
              Correo:
            </Text>
            <Text>
              {userProfile?.email}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
