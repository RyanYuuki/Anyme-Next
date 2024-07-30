import React from "react";

const AnimeCover = ({ posterSrc }) => {
  if (!posterSrc) {
    return (
      <div className="w-full h-[250px] object-cover rounded-sm">
        <div className="skeleton-universal" />
      </div>
    );
  }
  return (
    <div className="relative rounded-lg">
      <img
        className="w-full h-[500px] object-cover rounded-sm animated"
        src={posterSrc}
      />
      <div className="top-0 absolute w-full h-full bg-black/75  backdrop-blur-lg z-50" />
    </div>
  );
};

export default AnimeCover;
