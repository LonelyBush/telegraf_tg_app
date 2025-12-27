import { BrowserRouter, Route, Routes } from 'react-router';
import { Forum } from '../../pages/forum/forum';
import { Home } from '../../pages/home/home';
import { AuthLayout } from '../layouts/authLayout/authLayout';
import { Login } from '../../pages/login/login';
import { Registration } from '../../pages/registration/registration';
import { Post } from '../../pages/post/post';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/registration" index element={<Registration />} />
          <Route path="/forum" element={<Forum />}>
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
