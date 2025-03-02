import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  registerProps: any
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  registerProps,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      {...registerProps}
      className="border p-2 rounded w-full"
    />
  );
};
export default Input;