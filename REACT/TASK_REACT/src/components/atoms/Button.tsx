import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {text}
    </button>
  );
};
