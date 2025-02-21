import React from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-10 h-10 rounded-full" />;
};

export default ProfileImage;
