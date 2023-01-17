import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = (props) => {
  const users = useSelector((state) => state.users);
  const location = useLocation();

  if (!users.auth) {
    return (
      <Navigate
        to={{
          pathname: "/auth",
          state: { from: location },
        }}
        replace
      />
    );
  }

  return props.children;
};

export default AuthGuard;
