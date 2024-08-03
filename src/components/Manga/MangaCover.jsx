import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const AnimeCover = ({ posterSrc }) => {
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    setTimer(false);
    setTimeout(() => setTimer(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative rounded-lg">
      {!timer ? (
        <Skeleton className="w-full h-[300px] max-md:h-[200px] object-cover rounded-sm" />
      ) : (
        <>
          <img
            className="w-full h-[300px] max-md:h-[200px] object-cover rounded-sm animated"
            src={posterSrc}
          />
          <div className="top-0 absolute w-full h-full custom-gradient z-50 animated" />
        </>
      )}
    </div>
  );
};

export default AnimeCover;
