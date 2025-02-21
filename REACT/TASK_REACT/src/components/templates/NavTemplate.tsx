import React from "react";
import NavBar from "../organisms/NavBar";

const NavTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default NavTemplate;
