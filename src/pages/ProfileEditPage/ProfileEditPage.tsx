import { SmallCloseIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

import { UpdateUserForm } from './components/UpdateUserForm'


export function ProfileEditPage() {

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    setProfileImage(selectedFile != null ? selectedFile : null)
  }

  const resetProfileImage = () => {
    setProfileImage(null)
  }

  const showPreviewImage = () => {
    if (profileImage !== null) {
      return URL.createObjectURL(profileImage)
    }

    return undefined
  }

  return (
    <Flex
      align={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      justify={'center'}
      minH={'100vh'}
    >
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        maxW={'md'}
        my={12}
        p={6}
        rounded={'xl'}
        spacing={4}
        w={'full'}
      >
        <Heading fontSize={{ base: '2xl', sm: '3xl' }} lineHeight={1.1}>
          User Profile Edit
        </Heading>
        <FormControl id='userIcon'>
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size='xl' src={showPreviewImage()}>
                <AvatarBadge
                  aria-label='remove Image'
                  as={IconButton}
                  colorScheme='red'
                  icon={<SmallCloseIcon />}
                  rounded='full'
                  size='sm'
                  top='-10px'
                  onClick={resetProfileImage}
                />
              </Avatar>
            </Center>
            <Box
              alignContent={'center'}
              alignItems={'center'}
              display={'flex'}
              flexWrap={'wrap'}
              gap={'8px'}
              w='full'
            >
              <Input
                ref={fileInputRef}
                style={{ display: 'none' }}
                type='file'
                onChange={handleFileChange}
              />
              <Button
                colorScheme='whatsapp'
                flexGrow={'1'}
                size={'sm'}
                onClick={handleButtonClick}
              >
                Change image
              </Button>
              <Button
                colorScheme='messenger'
                flexGrow={'1'}
                isDisabled
                size={'sm'}
              >
                Upload image
              </Button>
              <Button
                colorScheme='red'
                isDisabled
                size={'sm'}
                w='full'
              >
                Delete image uploaded
              </Button>
            </Box>
          </Stack>
        </FormControl>
        <UpdateUserForm />
      </Stack>
    </Flex>
  )
}
