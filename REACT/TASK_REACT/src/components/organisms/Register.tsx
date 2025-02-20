import React from "react";
import { RegisterForm } from "../molecules/RegisterForm";
import { LanguageSelector } from "../molecules/LanguageSelector";
import API from "../../services/api";

const Register: React.FC = () => {
  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ) => {
    console.log("Registering:", username, email, role);
    // API
    
    const response = await API.post("/api/auth/register", { email, password, })
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">register</h2>
      <LanguageSelector />
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};
export default Register;
