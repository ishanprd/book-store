import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center max-w-full">
      <div className="w-40 h-40 border-b-4 border-black/70 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;