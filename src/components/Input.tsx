import { InputHTMLAttributes, ReactNode } from "react";

export type Props = {} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <>
      {/* input */}
      <div
        className={`
        relative flex h-[3rem]
        select-none gap-2 rounded-xl
        bg-[#0F0F0F] text-[#AEAEAE] focus-within:ring-1 ring-pink-500
        ${className}
      `}
      >
        {/* text field */}
        <input
          className={`
          h-full w-full bg-[transparent] p-4
          placeholder:text-[#454545] focus:border-0 focus:outline-none focus:ring-0 
        `}
          {...props}
        />
      </div>
    </>
  );
};
