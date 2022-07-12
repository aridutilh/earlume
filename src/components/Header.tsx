import { GiFairyWand } from "react-icons/gi";

export const Header = () => (
  <div className="flex flex-col gap-2 pb-3 border-b border-[#181818]">
    {/* Logo */}
    <div className="flex items-center gap-4 select-none">
      {/* <span className="text-[2.3rem]">🧚🏼‍♀️</span> */}

      <GiFairyWand className="text-[2.3rem] text-pink-400" />

      <h1 className="font-kronaOne text-[1.8rem]">Mom's Back!</h1>
    </div>

    {/* Description */}
    <p className="text-[#8d8d8d]">
      Want to preserve your loved one's voices for eternity? Narrate text using
      the a voice imprint that can be made in as little as 10 minutes of audio
      samples. Easy as pie.
    </p>
  </div>
);
