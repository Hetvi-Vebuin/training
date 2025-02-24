import React from "react";
import { LoginForm } from "../molecules/LoginForm";
import API from "../../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URLConstant } from "../../util/appConstants/constant";
import { useUser } from "../../context/UserContext";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {fetchUser} = useUser();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await API.post(`/${URLConstant.AUTH}/${URLConstant.LOGIN}`, { email, password });

      if (response.status === 200) {        
        const token = response.data.data.token;
        dispatch(loginSuccess(token));
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          closeButton: false,
        });
        fetchUser();
        // Redirect user after successful login
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 2000,
          closeButton: false, 
        }
      );
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
