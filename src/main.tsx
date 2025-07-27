import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  ColorModeScript,
  type ThemeConfig,
  extendTheme
} from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { App } from 'App'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const queryClient = new QueryClient()

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
        <Toaster />
      </QueryClientProvider>
    </ChakraProvider>
  </>
)
