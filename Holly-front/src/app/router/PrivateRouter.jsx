import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userSelector } from '../../entities/selectors';
import { USER_ROLES } from '../../shared/config/user-roles';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector(userSelector);

  const admin = currentUser?.role === USER_ROLES.ADMIN ? true : false;

  return admin ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
