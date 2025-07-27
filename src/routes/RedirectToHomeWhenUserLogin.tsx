import { Navigate, Outlet } from 'react-router-dom'

import { useAppStore } from 'store/useAppStore'

export const RedirectToHomeWhenUserLogin = () => {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return userAuthenticated === undefined || userAuthenticated === null ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}
