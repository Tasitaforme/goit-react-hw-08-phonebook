import Header from 'components/Header/Header';
import { Loader } from 'components/Loader/Loader';
import ScrollButton from 'components/ScrollButton/ScrollButton';
import { toastOptions } from 'components/StyledComponents/CommonElemens.styled';
import React, { Suspense, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectToken } from 'redux/auth/selectors';
import { refreshThunk } from 'redux/auth/thunks';
import { fetchContacts } from 'redux/operationsThunks';

function SharedLayout() {
  const isAuth = useSelector(selectToken);
  const dispatch = useDispatch();
  const localToken = localStorage.getItem('token');
  
  useEffect(() => {
    const refresh = () => {
      !isAuth &&
        localToken &&
        dispatch(refreshThunk())
          .unwrap()
          .then(() => {
            dispatch(fetchContacts());
          })
        .catch(error => {
            if (error.response.status === 401) {
              localStorage.removeItem('token');
              document.location.reload();
              return;
            }
          toast.error(`Unknown error... \n ${error.message}`);
          });
    }
    refresh();
  }, [dispatch, isAuth, localToken]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster toastOptions={toastOptions} />
      <ScrollButton />
    </>
  );
}

export default SharedLayout