import { Center, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'

import { useAppStore } from './store/useAppStore'

import { MainRouter } from 'routes/MainRouter'
import { useUserQuery } from 'hooks/queries/useUserQuery'

export function App() {
  const { user, isPending, isError } = useUserQuery()
  const setUserAuthenticated = useAppStore(
    (state) => state.setUserAuthenticated
  )

  useEffect(() => {
    if (user === undefined) {
      return
    }
    setUserAuthenticated(user)
  }, [user, setUserAuthenticated])

  if (isPending) {
    return (
      <Center height={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  if (isError) {
    localStorage.removeItem('AUTH_TOKEN')
  }

  return <MainRouter />
}
