import Link from "next/link";
import React from "react";

const GoogleText = () => {
  return (
    <Link href={"/"} className="text-4xl font-bold">
      <span className="text-blue-500">G</span>
      <span className="text-red-500">o</span>
      <span className="text-yellow-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </Link>
  );
};

export default GoogleText;
