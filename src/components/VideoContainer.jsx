import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY, YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import SkeletonLoader from "./Skeleton";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((state) => state.category.selectedCategory);
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

  const fetchVideos = async () => {
    // setLoading(true);
    try {
      const query = category === "All" ? "trending" : category;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();

      setVideos(data.items);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);

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
              <div key={i} className="w-[390px] p-2">
                <SkeletonLoader height="200px" className="rounded-lg w-full" />{" "}
                <div className="flex mt-3 gap-3">
                  <SkeletonLoader layout="circle" width="40px" height="40px" />
                  <div className="flex flex-col gap-2 w-full">
                    <SkeletonLoader height="14px" width="80%" />
                    <SkeletonLoader height="12px" width="60%" />
                  </div>
                </div>
              </div>
            ))
        : videos?.map((video) => (
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
