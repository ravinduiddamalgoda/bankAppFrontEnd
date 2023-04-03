import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export function AuthGuard({children}){
    let authPayload = useContext(AuthContext);

    if(!authPayload || !authPayload.token){

        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export function GuestGuard({ children }) {
    let authPayload = useContext(AuthContext);
    // check if user exists
    if (authPayload && authPayload.token) {
      return <Navigate to="/app" />;
    }
    return <>{children}</>;
  }