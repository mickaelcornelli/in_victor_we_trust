"use client";

import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getStrawpoll } from "../api/api";

const StrawPollEmbed = ({ pollId }) => {
  const [strawpoll, setStrawpoll] = useState(null);

  const fetchData = async () => {
    const response = await getStrawpoll(pollId)
    setStrawpoll(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!strawpoll) {
    return (
      <div className="h-full flex items-center justify-center">
        <ThreeDots
          visible={true}
          height={60}
          width={60}
          color="rgb(52, 211, 153)"
          radius={9}
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <div className="strawpoll-embed flex flex-col mx-auto w-full min-h-[450px] gap-4 max-w-[640px]">
      <iframe
        title="StrawPoll Embed"
        src={strawpoll.embed_url}
        style={{
          position: "static",
          visibility: "visible",
          display: "block",
          width: "100%",
          flexGrow: 1,
        }}
        allowFullScreen
      />
    </div>
  );
};

export default StrawPollEmbed;
