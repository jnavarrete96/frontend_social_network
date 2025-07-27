import { useMemo } from 'react';

import { baseUrl } from 'utils/baseUrl';
import { useAppStore } from 'store/useAppStore';


export const useUserAuthenticatedImages = () => {
  const userAuthenticated = useAppStore(store => store.userAuthenticated)

  const profileImageUserAuthenticatedUrl = useMemo(() => {
    if (userAuthenticated === null) {
      return undefined
    } else if (userAuthenticated.profileImage === null) {
      return undefined
    } else {
      return `${baseUrl}/${userAuthenticated.profileImage}`
    }
  }, [userAuthenticated])

  const profileBackgroundImageUserAuthenticatedUrl = useMemo(() => {
    if (userAuthenticated === null) {
      return undefined
    } else if (userAuthenticated.profileImage === null) {
      return undefined
    } else {
      return `${baseUrl}/${userAuthenticated.profileImage}`
    }
  }, [userAuthenticated])

  return { profileImageUserAuthenticatedUrl, profileBackgroundImageUserAuthenticatedUrl }
}
