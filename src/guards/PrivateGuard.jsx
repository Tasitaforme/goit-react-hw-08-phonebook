import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectToken } from 'redux/auth/selectors';

const PrivateGuard = ({ component: Component, redirectTo }) => {
  const isAuth = useSelector(selectToken);
const location = useLocation();
  return isAuth ? <Component /> : <Navigate to={redirectTo} state={location} />;
};

export default PrivateGuard;
