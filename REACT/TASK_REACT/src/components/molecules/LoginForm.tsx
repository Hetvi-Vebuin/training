import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {t}=useTranslation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="space-y-4"
    >
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" text={t("LOGIN.LOGIN_BUTTON")}></Button>
    </form>
  );
};
