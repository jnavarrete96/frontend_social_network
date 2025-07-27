import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { MdOutlineEdit, MdDelete } from 'react-icons/md'
import { TbDots } from 'react-icons/tb'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { NavLink} from 'react-router-dom'

import { formatDate } from '../../utils/formatDate'

import {
  ButtonIconContainer,
  UserLogo
} from 'components/ui'
import { profileBackground } from 'assets'
import { useAppStore } from 'store/useAppStore'
import { useToggleLikeMutation } from 'hooks/mutations/useToggleLikeMutation'
import { useLikesCountQuery } from 'hooks/queries/useLikesQuery'

interface Props {
  urlImage?: string
  post: SimplePost
  showOptionsMenu?: boolean
  showButtons?: boolean
  showCrudButtons?: boolean
}

interface PostRequest {
  content: string
}

export function SimplePostCard({
  urlImage,
  post,
  showOptionsMenu = false,
  showButtons = false,
  showCrudButtons = false
}: Readonly<Props>) {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLiked, setIsLiked] = useState(false) // Por ahora false, luego puedes implementar la lógica

  const { likesCount, isLoadingLikes } = useLikesCountQuery(post.id)
  const { toggleLike, isPending: isPendingLike } = useToggleLikeMutation(post.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch
  } = useForm<PostRequest>({
    mode: 'onBlur',
    defaultValues: {
      content: post?.content
    }
  })

  const handleLike = () => {
    toggleLike(undefined, {
      onSuccess: (data) => {
        setIsLiked(data.liked)
      },
      onError: (error) => {
        console.error('Error al dar like:', error)
      }
    })
  }

  const handleDelete = (postId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // deletePost(postId)
        console.log('Delete post:', postId)
      }
    })
  }

  const handleEdit: SubmitHandler<PostRequest> = (postRequest: PostRequest) => {
    // editPost({ postId: post.id, postRequest })
    console.log('Edit post:', post.id, postRequest)
  }


  // Crear un objeto User temporal para mostrar la información del autor
  const authorAsUser: UserProfile = {
    id: post?.author?.id, // Usando el id del post como temporal
    full_name: post?.author?.full_name,
    user_name: post?.author?.user_name,
    birth_date: '', 
    email: '', 
    created_at: '',
    updated_at: ''
  }

  return (
    <>
      <Box backgroundColor='gray.700' borderRadius='8px' padding='16px'>
        <Box display='flex' gap={3} marginBottom={4}>
          <UserLogo imageSize='40' user={authorAsUser} />
          <Box display='flex' flexDirection='column' flexGrow={1} rowGap={1}>
            <Heading size='sm'>
              <Text
                _hover={{ textDecoration: 'underline' }}
                as={NavLink}
                to={`/profile/${post?.author?.id}`}
              >
                {post?.author?.full_name}
              </Text>
            </Heading>
            <Text fontSize='xs'>{formatDate(post?.created_at)}</Text>
          </Box>
          {showOptionsMenu && (
            <Box mr={'-8px'} mt={'-8px'}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<TbDots fontSize={'20px'} />}
                  rounded={'full'}
                  size={'sm'}
                  variant='ghost'
                />
                <MenuList>
                  {showCrudButtons &&
                    post?.author?.user_name === userAuthenticated?.user_name && (
                      <>
                        <MenuItem
                          icon={<MdOutlineEdit fontSize={'16px'} />}
                          onClick={() => {
                            onOpen()
                          }}
                        >
                          Edit post
                        </MenuItem>
                        <MenuItem
                          icon={<MdDelete fontSize={'16px'} />}
                          onClick={() => {
                            handleDelete(post.id)
                          }}
                        >
                          Delete post
                        </MenuItem>
                      </>
                    )}
                </MenuList>
              </Menu>
            </Box>
          )}
        </Box>
        <Box>
          <Text marginBottom='8px'>{post?.content}</Text>
          {urlImage !== undefined && urlImage.length > 0 && (
            <Image
              borderRadius='8px'
              height='193px'
              objectFit='cover'
              src={profileBackground}
              width='100%'
            />
          )}
          {Boolean(userAuthenticated) && (
            <>
              <Box
                display='flex'
                gap={4}
                justifyContent='end'
                marginBottom={2}
                marginTop={3}
              >
                {/* Mostrar el conteo de likes desde la API */}
                <Text fontSize='xs'>
                  {isLoadingLikes ? '...' : likesCount} Likes
                </Text>
              </Box>
              <Divider opacity={0.1} />
              {showButtons && (
                <Box
                  alignItems='center'
                  columnGap='10px'
                  display='flex'
                  height='50px'
                  justifyContent='center'
                >
                  <ButtonIconContainer
                    colorScheme='red'
                    isDisabled={isPendingLike}
                    onClick={() => {
                      handleLike()
                    }}
                  >
                    <Icon as={isLiked ? FaHeart : FaRegHeart} boxSize={5} />
                  </ButtonIconContainer>
                  {/* Puedes agregar más botones cuando implementes bookmarks y comentarios */}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
      
      {/* Modal para editar post */}
      {showOptionsMenu && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as={'form'} onSubmit={handleSubmit(handleEdit)}>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl
                isRequired
                id='content'
                isInvalid={Boolean(errors.content)}
              >
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="What's happening?"
                  resize="vertical"
                  {...register('content', {
                    required: {
                      value: true,
                      message: 'el tweet no debe estar vacio'
                    },
                    minLength: {
                      value: 4,
                      message: 'el tweet debe tener 4 o mas caracteres'
                    }
                  })}
                />
                <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                isDisabled={
                  !isValid ||
                  isSubmitting ||
                  // isPendingUpdatePost ||
                  post.content === watch('content')
                }
                isLoading={isSubmitting}
                loadingText={'Updating post'}
                mr={3}
                type='submit'
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setValue('content', post?.content)
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}