import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  text: string;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ to, text, className }) => {
  return (
    <RouterLink to={to} className={`text-blue-600 hover:underline ${className}`}>
      {text}
    </RouterLink>
  );
};

export default Link;
