import { useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";

export const useAuth = () => {
  let isAuthenticated=false;
  const authState  = useSelector((state: RootState) => state.auth);  
  const token = authState.token;
  
  if(token){
    isAuthenticated=true && token !== "invalid-token";
  }
  return {
    token,
    isAuthenticated,
  };
};
