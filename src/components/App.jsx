import React, { lazy } from 'react';
import Home from './pages/Home/Home';
import SharedLayout from './SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error from './pages/Error/Error';
import PublicGuards from 'guards/PublicGuards';
import PrivateGuard from 'guards/PrivateGuard';
import Profile from './pages/Profile/Profile';

const Contacts = lazy(() => import('./pages/Contacts/Contacts'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route
          path="contacts"
          element={<PrivateGuard component={Contacts} redirectTo="/login" />}
        />
        <Route
          path="profile"
          element={<PrivateGuard component={Profile} redirectTo="/login" />}
        />
        <Route
          path="login"
          element={<PublicGuards component={Login} redirectTo="/contacts" />}
        />
        <Route
          path="register"
          element={<PublicGuards component={Register} redirectTo="/contacts" />}
        />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
