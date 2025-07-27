import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { PostsCreatedList } from '../pages/ProfilePage/components/PostsCreatedList'
import { PostsLikedList } from '../pages/ProfilePage/components/PostsLikedList'

import { PrivateRoutes } from './PrivateRoutes'
import { RedirectToHomeWhenUserLogin } from './RedirectToHomeWhenUserLogin'

import { MainLayout } from 'components/layouts/MainLayout'
import {
  HomePage,
  LoginPage,
  ProfileEditPage,
  ProfilePage,
  RegisterPage
} from 'pages'

interface Props {}

export function MainRouter(props: Props) {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ProfilePage />} path='/profile/:username'>
              <Route element={<PostsCreatedList />} path='postsCreated' />
              <Route element={<PostsLikedList />} path='postsLiked' />
            </Route>
            <Route element={<ProfileEditPage />} path='/profile/edit' />
            <Route element={<HomePage />} path='/' />
          </Route>
          <Route element={<RedirectToHomeWhenUserLogin />}>
            <Route element={<LoginPage />} path='/login' />
            <Route element={<RegisterPage />} path='/register' />
          </Route>

          <Route element={<Navigate replace to='/' />} path='*' />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
