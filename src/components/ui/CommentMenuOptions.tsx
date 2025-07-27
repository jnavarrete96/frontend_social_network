import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  type BoxProps,
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useCallback } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useDeleteCommentMutation } from 'hooks/mutations/useDeleteCommentMutation'
import { useUpdateCommentMutation } from 'hooks/mutations/useUpdateCommentMutation'

interface Props {
  post: Post
  comment: IComment
}

export function CommentMenuOptions({
  post,
  comment,
  ...rest
}: Readonly<BoxProps & Props>) {
  const { deleteComment, isPending: isPendingDeleteComment } =
    useDeleteCommentMutation()
  const {
    updateComment,
    data: commentUpdated,
    isPending: isPendingUpdateComment
  } = useUpdateCommentMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch
  } = useForm<CommentRequest>({
    mode: 'onBlur',
    defaultValues: {
      content:
        commentUpdated?.content != null
          ? commentUpdated.content
          : comment?.content
    }
  })

  const handleDeleteComment = useCallback(() => {
    const deleteCommentRequest: DeleteCommentRequest = {
      commentId: comment.id.toString(),
      postId: post.id.toString()
    }

    deleteComment(deleteCommentRequest)
  }, [post, comment, deleteComment])

  const handleUpdate: SubmitHandler<CommentRequest> = ({ content }) => {
    const updateCommentRequest: UpdateCommentRequest = {
      commentId: comment.id.toString(),
      postId: post.id.toString(),
      content
    }

    updateComment(updateCommentRequest)
  }

  return (
    <Box {...rest}>
      <Popover isLazy placement='bottom'>
        <PopoverTrigger>
          <IconButton
            aria-label='More server options'
            icon={<BsThreeDotsVertical />}
            size='xs'
            variant='solid'
            w='fit-content'
          />
        </PopoverTrigger>
        <PopoverContent _focus={{ boxShadow: 'none' }} w='fit-content'>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                colorScheme='orange'
                fontSize='sm'
                fontWeight='normal'
                justifyContent='space-between'
                rightIcon={<MdEdit />}
                variant='ghost'
                w='194px'
                onClick={onOpen}
              >
                Edit comment
              </Button>
              <Button
                colorScheme='red'
                fontSize='sm'
                fontWeight='normal'
                isDisabled={isPendingDeleteComment}
                isLoading={isPendingDeleteComment}
                justifyContent='space-between'
                rightIcon={<MdDelete />}
                variant='ghost'
                w='194px'
                onClick={handleDeleteComment}
              >
                Remove comment
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={'form'} onSubmit={handleSubmit(handleUpdate)}>
          <ModalHeader>Edit comment</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isRequired
              id='content'
              isInvalid={Boolean(errors.content)}
            >
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder='comment text'
                resize='vertical'
                {...register('content', {
                  required: {
                    value: true,
                    message: 'el tweet no debe estar vacio'
                  },
                  minLength: {
                    value: 2,
                    message: 'el comment debe tener 2 o mas caracteres'
                  }
                })}
              />
              <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              isDisabled={
                !isValid ||
                isSubmitting ||
                isPendingUpdateComment ||
                comment.content === watch('content')
              }
              isLoading={isSubmitting || isPendingUpdateComment}
              loadingText={'updating comment'}
              mr={3}
              type='submit'
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                setValue('content', comment.content)
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
