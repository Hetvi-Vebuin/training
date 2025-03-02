import React from "react";
import { RegisterForm } from "../molecules/RegisterForm";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URLConstant } from "../../util/appConstants/constant";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    console.log("Registering:", username, email, password, role);
    try {
      const response = await API.post(`/${URLConstant.AUTH}/${URLConstant.REGISTER}`, {
        email,
        username,
        password,
        role,
      });

      console.log("Response:", response);

      if (response.status === 201) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 2000,
          closeButton: false,
        });

        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
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
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
