import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-gray-100"></div>
    </div>
  );
};

export default Loading;
