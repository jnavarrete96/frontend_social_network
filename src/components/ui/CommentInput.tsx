import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'

import { UserAuthenticatedLogo } from './UserAuthenticatedLogo'

interface Props {
  post: Post
  addComment: (commentRequest: CommentRequest) => void
  isPendingComment: boolean
}

export function CommentInput({
  post,
  addComment,
  isPendingComment
}: Readonly<Props>) {
  const [commentValue, setCommentValue] = useState('')

  const handleAddComment = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const comment = formData.get('comment') as string
    const commentRequest = {
      content: comment,
      postId: post.id.toString()
    }

    addComment(commentRequest)
    setCommentValue('')
  }
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  return (
    <Box as={'form'} height='60px' padding='10px 0' onSubmit={handleAddComment}>
      <Box alignItems='center' columnGap={4} display='flex' height='40px'>
        <UserAuthenticatedLogo imageSize='40' />
        <FormControl height='100%'>
          <InputGroup>
            <Input
              fontSize='14px'
              name='comment'
              placeholder='Add a comment...'
              value={commentValue}
              variant='filled'
              onChange={handleCommentChange}
            />
            <InputRightElement mr={'4px'} width='4.5rem'>
              <Button
                h='1.75rem'
                isDisabled={commentValue.length < 2 || isPendingComment}
                isLoading={isPendingComment}
                loadingText='Submitting'
                size='sm'
                type='submit'
              >
                Submit
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  )
}
