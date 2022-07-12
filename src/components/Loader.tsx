import React from "react";

export const Loader = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div {...props}>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-4 h-4 border-2 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};
