import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import SkeletonLoader from "./Skeleton";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    const calculateSkeletonCount = () => {
      const cardWidth = 288; // 72 * 4 (Tailwind w-72 = 18rem)
      const cardHeight = 240; // Approx including title etc.
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const cardsPerRow = Math.floor(containerWidth / cardWidth);
      const rows = Math.ceil(containerHeight / cardHeight);

      setSkeletonCount(cardsPerRow * rows);
    };

    calculateSkeletonCount();
    window.addEventListener("resize", calculateSkeletonCount);

    return () => window.removeEventListener("resize", calculateSkeletonCount);
  }, []);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data?.json();
    setVideos(json?.items);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-wrap">
      {isLoading
        ? Array(skeletonCount)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-72 p-2">
                <SkeletonLoader height="160px" className="rounded-lg w-full" />{" "}
                <div className="flex mt-3 gap-3">
                  <SkeletonLoader layout="circle" width="40px" height="40px" />
                  <div className="flex flex-col gap-2 w-full">
                    <SkeletonLoader height="14px" width="80%" />
                    <SkeletonLoader height="12px" width="60%" />
                  </div>
                </div>
              </div>
            ))
        : videos.map((video) => (
            <Link key={video.id} to={"/watch?v=" + video.id}>
              <VideoCard info={video} />
            </Link>
          ))}

      {/* {videos[0] && <AdVideoCard info={videos[0]} />}
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))} */}
    </div>
  );
};

export default VideoContainer;
