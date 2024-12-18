import React from "react";
import { SunIcon } from "@heroicons/react/24/solid";

const Loading = () => {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-bounce text-yellow-500"
        color="yellow"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Hold on, Generating Weather Information!
      </h1>
    </div>
  );
};

export default Loading;
