import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../../pages/home/home';
import { AuthLayout } from '../layouts/authLayout/authLayout';
import { Login } from '../../pages/login/login';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/login" index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
