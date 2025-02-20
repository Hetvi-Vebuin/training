import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Select } from "../atoms/Select";

interface RegisterFormProps {
  onSubmit: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username, email, password, confirmPassword, role);
      }}
      className="space-y-4"
    >
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={[
          { label: "User", value: "user" },
          { label: "Admin", value: "admin" },
        ]}
      />      
      <Button type="submit" text="Register" />
    </form>
  );
};
