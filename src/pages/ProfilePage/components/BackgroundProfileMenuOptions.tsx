import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Box,
  type BoxProps
} from '@chakra-ui/react'
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs'
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri'

export function BackgroundProfileMenuOptions(props: Readonly<BoxProps>) {
  return (
    <Box {...props}>
      <Popover isLazy placement='bottom'>
        <PopoverTrigger>
          <IconButton
            aria-label='More server options'
            icon={<BsThreeDotsVertical />}
            variant='solid'
            w='fit-content'
          />
        </PopoverTrigger>
        <PopoverContent _focus={{ boxShadow: 'none' }} w='fit-content'>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                fontSize='sm'
                fontWeight='normal'
                justifyContent='space-between'
                rightIcon={<BsChatSquareQuote />}
                variant='ghost'
                w='194px'
              >
                Request Access
              </Button>
              <Button
                colorScheme='red'
                fontSize='sm'
                fontWeight='normal'
                justifyContent='space-between'
                rightIcon={<RiFileShredLine />}
                variant='ghost'
                w='194px'
              >
                Purge Redis Cache
              </Button>
              <Button
                colorScheme='red'
                fontSize='sm'
                fontWeight='normal'
                justifyContent='space-between'
                rightIcon={<RiRestartLine />}
                variant='ghost'
                w='194px'
              >
                Restart Server
              </Button>
              <Button
                colorScheme='red'
                fontSize='sm'
                fontWeight='normal'
                justifyContent='space-between'
                rightIcon={<RiShutDownLine />}
                variant='ghost'
                w='194px'
              >
                Disable Server
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
