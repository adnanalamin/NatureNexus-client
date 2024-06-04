import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "./../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className=" flex h-screen items-center">
        <span className="loading loading-bars loading-lg mx-auto "></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={location?.pathname || "/"}></Navigate>;
};
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
