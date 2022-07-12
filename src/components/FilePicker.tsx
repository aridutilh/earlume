import { InputHTMLAttributes, ReactNode, useState } from "react";

export type Props = {} & InputHTMLAttributes<HTMLInputElement>;

export const FilePicker: React.FC<Props> = ({
  className,
  name,
  onChange,
  ...props
}) => {
  const [fileName, setFileName] = useState<string>();

  return (
    <div
      className={`
      rounded-xl flex items-center h-[3rem] 
      bg-[#0F0F0F] text-[#AEAEAE] placeholder:text-[#454545]
      focus:ring-1 ring-pink-500 focus:outline-none select-none
      ${className}
   `}
      tabIndex={0}
    >
      <input
        type="file"
        className="hidden"
        id={name}
        name={name}
        onChange={(e) => {
          setFileName(e.target.files[0]?.name || "");
          onChange(e);
        }}
        {...props}
      />

      <div className="flex justify-between items-center h-full w-full">
        {/* File Name */}
        <span className="my-auto ml-4 truncate">
          {fileName || "No File Chosen."}
        </span>

        {/* Choose File Button */}
        <label
          htmlFor={name}
          className="cursor-pointer rounded-lg h-[2rem] mr-2 px-4 bg-[#2B2B2B] hover:bg-[#303030] border border-[#3A3A3A] grid place-items-center ml-auto truncate"
        >
          {fileName ? "Change File" : "Choose a File"}
        </label>
      </div>
    </div>
  );
};
