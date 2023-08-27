import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  HeaderNavLink,
  HeaderNavWrap,
  HeaderWrap,
} from './Header.styled';
import { selectProfile, selectToken } from 'redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from 'redux/auth/thunks';
import { toast } from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectToken);
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logOutThunk()).unwrap();
      toast.success('You have successfully logged out!');
    } catch (error) {
      toast.error(`Unknown error... \n ${error.message}`);
    }
  };

  return (
    <HeaderWrap>
      <HeaderNavWrap>
        <HeaderNavLink to="/">Home</HeaderNavLink>
        <HeaderNavLink to="/contacts">Contacts</HeaderNavLink>
      </HeaderNavWrap>
      {/* <HeaderNavWrap>
        <Button onClick={() => navigate('/login', { replace: true })}>
          Login
        </Button>
        
        <Button onClick={() => navigate('/register', { replace: true })}>
          Register
        </Button>
      </HeaderNavWrap> */}
      <HeaderNavWrap>
        {profile && (<HeaderNavLink to="/profile">{profile.email}</HeaderNavLink>)}
        <Button
          onClick={() =>
            isAuth ? handleLogOut() : navigate('/login', { replace: true })
          }
        >
          {isAuth ? 'Logout' : 'Login'}
        </Button>
        {!isAuth && (
          <Button onClick={() => navigate('/register', { replace: true })}>
            Register
          </Button>
        )}
      </HeaderNavWrap>
    </HeaderWrap>
  );
};

export default Header;
