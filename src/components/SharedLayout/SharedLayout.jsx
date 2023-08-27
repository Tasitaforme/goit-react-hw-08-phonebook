import Header from 'components/Header/Header';
import { Loader } from 'components/Loader/Loader';
import { toastOptions } from 'components/StyledComponents/CommonElemens.styled';
import React, { Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectToken } from 'redux/auth/selectors';
import { refreshThunk } from 'redux/auth/thunks';

function SharedLayout() {
  const isAuth = useSelector(selectToken);
  const dispatch = useDispatch();
  // const token = localStorage.getItem('token');
  
  useEffect(() => {
    const refresh = () => {
      !isAuth && dispatch(refreshThunk());
    };
    refresh();
  }, [dispatch, isAuth]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster toastOptions={toastOptions} />
    </>
  );
}

export default SharedLayout