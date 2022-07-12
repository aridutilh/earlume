import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: any;
};

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        grid h-[3rem]
        select-none place-items-center
        rounded-xl
        px-[2rem] text-[1rem]
        transition-all hover:opacity-80
        focus:ring-1 ring-pink-500 focus:outline-pink-500

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
