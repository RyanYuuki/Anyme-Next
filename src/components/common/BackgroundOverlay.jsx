import React from "react";

const BackgroundOverlay = () => {
  return (
    <div className="fixed dark:md:block dark:opacity-100 top-0 z-[-1]">
      <img
        className="relative z-10 opacity-100 shadow-black/5 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
        src={"/body-background.png"}
        alt="Background"
      />
    </div>
  );
};

export default BackgroundOverlay;