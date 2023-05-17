import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export function AuthGuard({children}){
  const navigate = useNavigate();
    let authPayload = useContext(AuthContext);

    if(!authPayload || !authPayload.token){

        // return <Navigate to="/login" />;
        navigate('/login');
    }

    return <>{children}</>;
}

export function GuestGuard({ children }) {
    const navigate = useNavigate();
    let authPayload = useContext(AuthContext);
    // check if user exists
    if (authPayload && authPayload.token) {
      return <Navigate to="/app" />;
    }
    return <>{children}</>;
  }