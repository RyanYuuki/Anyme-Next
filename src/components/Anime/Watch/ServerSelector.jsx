import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ServerSelector = ({
  onClick,
  activeServer,
  currentEpisode,
  episodeType,
  Servers,
}) => {
  return (
    <div className={`flex flex-row justify-between w-full h-[90px] animated`}>
      <div className="flex flex-col justify-center gap-3 pl-5 h-full w-[55%] bg-neutral-700/30 rounded-md">
        <p>
          You're Watching <span>Episode {currentEpisode}</span>{" "}
        </p>
        <p>
          If current server doesn't work, you can switch to a different server.
        </p>
      </div>
      <div className="flex flex-col w-[43%] justify-evenly bg-neutral-700/30 rounded-md">
        <div className="flex flex-row justify-evenly items-center">
          <h1>
            <FontAwesomeIcon icon={faClosedCaptioning} /> Sub
          </h1>
          <div className="flex flex-row gap-1">
            {Servers.map((server) => (
              <p
                onClick={() => onClick("sub", server.toLowerCase())}
                className={`px-[15px] py-[5px] rounded-md ${
                  activeServer.toLowerCase() == server.toLowerCase() &&
                  episodeType == "sub"
                    ? "server-active"
                    : "bg-input"
                } hover:bg-indigo-400`}
              >
                {server}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <h1 className="pl-1">
            <FontAwesomeIcon icon={faMicrophone} /> Dub
          </h1>
          <div className="flex flex-row gap-1">
            {Servers.map((server) => (
              <p
                onClick={() => onClick("dub", server.toLowerCase())}
                className={`px-[15px] py-[5px] rounded-md ${
                  activeServer.toLowerCase() == server.toLowerCase() &&
                  episodeType == "dub"
                    ? "server-active"
                    : "bg-input"
                } hover:bg-indigo-400`}
              >
                {server}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSelector;
