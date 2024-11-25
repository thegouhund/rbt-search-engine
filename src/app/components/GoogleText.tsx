import Link from "next/link";
import React from "react";

const GoogleText = ({ size = "sm" }: { size?: "lg" | "sm" }) => {
  return (
    <Link
      href={"/"}
      className={`${size == "lg" ? "text-6xl" : "text-4xl"} font-bold`}
    >
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#DB4437]">o</span>
      <span className="text-[#F4B400]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#0F9D58]">l</span>
      <span className="text-[#DB4437]">e</span>
    </Link>
  );
};

export default GoogleText;
