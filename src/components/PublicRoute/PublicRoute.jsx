// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import selectors from 'redux/session/session-selectors';

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectors.getIsAuth);
  return <>{isAuth ? <Navigate to="/" /> : children}</>;
  // return children;
};

export default PublicRoute;
// PublicRoute.propTypes = {
//   children: PropTypes.object.isRequired,
// };
