import React from "react";
import ProfileImage from "../atoms/ProfileImage";
import Button from "../atoms/Button";

const ProfileDropdown: React.FC = () => {
  return (
    <div className="relative">
      <ProfileImage src="/profile.jpg" alt="Profile" />
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
        <Button type="submit" onClick={()=>{}} text="Logout" />
      </div>
    </div>
  );
};

export default ProfileDropdown;
