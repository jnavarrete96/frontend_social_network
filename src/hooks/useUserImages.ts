import { useMemo } from 'react';

import { useFindUserByUsernameQuery } from './queries/useFindUserByUsernameQuery';

import { baseUrl } from 'utils/baseUrl';


export const useUserImages = (username: string) => {
  const { userProfile } = useFindUserByUsernameQuery(username)

  const userLogoUrl = useMemo(() => {
    if (userProfile === undefined) {
      return undefined
    } else if (userProfile.profileImage === null) {
      return undefined
    } else {
      return `${baseUrl}/${userProfile.profileImage}`
    }
  }, [userProfile])

  const userBackgroundUrl = useMemo(() => {
    if (userProfile === undefined) {
      return undefined
    } else if (userProfile.backgroundImage === null) {
      return undefined
    } else {
      return `${baseUrl}/${userProfile.backgroundImage}`
    }
  }, [userProfile])

  return { userLogoUrl, userBackgroundUrl }
}
