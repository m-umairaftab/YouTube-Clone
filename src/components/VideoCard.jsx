import React from "react";
import { formatViews } from "../utils/helper";
import { userIcon } from "../utils/constants";

const VideoCard = ({ info }) => {
  if (!info) return null;

  const { snippet, statistics } = info;

  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const views = statistics?.viewCount;

  return (
    <div className="w-72 p-2">
      <div className="mb-2">
        <img
          className="rounded-lg w-full aspect-video object-cover"
          alt="thumbnail"
          src={thumbnails?.medium?.url}
        />
      </div>
      <div className="flex">
        <img
          className="w-10 h-10 rounded-full mr-3"
          alt="channel icon"
          src={userIcon}
        />
        <div>
          <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-xs">{channelTitle}</p>
          <p className="text-gray-600 text-xs">
            {views ? formatViews(views) : "•"} •{" "}
            {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-red-900 ">
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
