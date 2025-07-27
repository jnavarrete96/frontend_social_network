import { protectedInstance } from 'api/axiosInstances'

const fetchUserData = async (): Promise<UserProfile> => {
  const response = await protectedInstance.get<UserProfile>('/users/profile')
  
  return response.data
}

const fetchUpdateUser = async (
  username: string,
  updateUserRequest: UpdateUserRequest
) => {
  const response = await protectedInstance.patch<User>(
    `/users/username/${username}`,
    updateUserRequest
  )

  const userUpdated = response.data

  return userUpdated
}
const fetchAllUsers = async () => {
  const response = await protectedInstance.get<User[]>('/users')
  const users = response.data

  return users
}

const fetchSearchUsersByUsernameOrName = async (peopleToSearch: string) => {
  const response = await protectedInstance.get<User[]>(
    `/users/search/${peopleToSearch}`
  )
  const users = response.data

  return users
}

const fetchFindUserByUsername = async (username: string) => {
  const response = await protectedInstance.get<User>(
    `/users/username/${username}`
  )
  const user = response.data

  return user
}

const fetchAddFollower = async (followerUsername: string) => {
  const response = await protectedInstance.patch<User>(
    `/users/addFollower/${followerUsername}`
  )
  const user = response.data

  return user
}

const fetchRemoveFollower = async (followerUsername: string) => {
  const response = await protectedInstance.patch<User>(
    `/users/removeFollower/${followerUsername}`
  )
  const user = response.data

  return user
}

const fetchAllFollowersByUsername = async (username: string) => {
  const response = await protectedInstance.get<User[]>(
    `/users/username/${username}/findAllFollowers`
  )
  const followers = response.data

  return followers
}

const fetchAllUsersFollowing = async (username: string) => {
  const response = await protectedInstance.get<User[]>(
    `/users/username/${username}/findAllUsersFollowing`
  )
  const followings = response.data

  return followings
}

export {
  fetchUserData,
  fetchUpdateUser,
  fetchAllUsers,
  fetchSearchUsersByUsernameOrName,
  fetchFindUserByUsername,
  fetchAddFollower,
  fetchRemoveFollower,
  fetchAllFollowersByUsername, fetchAllUsersFollowing
}
