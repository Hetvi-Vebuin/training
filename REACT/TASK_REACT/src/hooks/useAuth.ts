import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const useAuth = () => {
  let isAuthenticated=false;
  const { token } = useSelector((state: RootState) => state.auth);  
  
  if(token){
    isAuthenticated=true;
  }
  return {
    token,
    isAuthenticated,
  };
};
