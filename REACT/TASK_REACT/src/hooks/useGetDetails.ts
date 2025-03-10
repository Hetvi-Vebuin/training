import { useEffect, useState } from "react";
import API from "../services/Api";
import { URLConstant } from "../util/appConstants/constant";
import { User } from "../data/model/type/User";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useGetDetails = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users with isAdmin query parameter
        if (user?.role == "admin") {
          const response = await API.get(
            `/${URLConstant.USER}/${URLConstant.DETAILS}`,
            {
              params: { isAdmin: "true" }, // Ensures we get all users
            }
          );

          setUsers(response.data.userData);
        }
        else{
          navigate("no-match");
        }
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useGetDetails;
