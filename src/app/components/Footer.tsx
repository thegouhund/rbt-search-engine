import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto text-center py-4">
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Kelompok 7. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
