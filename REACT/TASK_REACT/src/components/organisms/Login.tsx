import React from "react";
import { LoginForm } from "../molecules/LoginForm";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../molecules/LanguageSelector";
import API from "../../services/api"; // Axios instance
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await API.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        console.log("token:",response.data.data.token);
        const token=response.data.data.token
        // Store token in Redux
        dispatch(loginSuccess(token));

        // Redirect user after successful login
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t("LOGIN.LOGIN_TEXT")}</h2>
      <LanguageSelector />
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
