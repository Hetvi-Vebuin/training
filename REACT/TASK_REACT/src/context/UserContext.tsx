import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import API from "../services/Api"; 
import { URLConstant } from "../util/appConstants/constant";
import { useAuth } from "../hooks/useAuth";

interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  clearUser: () => void;
  loading: boolean;
  fetchUser: ()=> void
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider:React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const clearUser = () => setUser(null);
  const auth=useAuth();

  const fetchUser = async () => {
    try {
      // user details
      setLoading(true);
      
      const response = await API.get(`/${URLConstant.USER}/${URLConstant.DETAILS}`);
      setUser(response.data.userData);

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if(auth.token && !user){
      fetchUser();
    }
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, clearUser, loading, fetchUser }} >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
