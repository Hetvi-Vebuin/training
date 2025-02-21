import { useEffect, useState } from "react";
import API from "../services/api";
import { URLConstant } from "../util/appConstants/constant";
import { User } from "../data/model/type/user";

const useGetDetails = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users with isAdmin query parameter
        const response = await API.get(`/${URLConstant.USER}/${URLConstant.DETAILS}`, {
          params: { isAdmin: "true" }, // Ensures we get all users
        });
        console.log("data:",response.data.userData);
        
        setUsers(response.data.userData);
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
