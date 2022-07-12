import React from "react";

export const Link = ({ href, text }) => {
  return (
    <a
      className="text-pink-50 hover:text-pink-500 outline-none focus:ring-1 ring-pink-500 rounded-[5px]"
      href={href}
    >
      {text}
    </a>
  );
};
