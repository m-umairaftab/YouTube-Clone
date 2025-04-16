import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { YOUTUBE_SEARCH_RESULT_API } from "../utils/constants";

import SearchResultsCard from "./SearchResultsCard";
import SkeletonLoader from "./Skeleton";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const query = searchParams.get("q");

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    const calculateSkeletonCount = () => {
      const cardHeight = 180; // Estimate per search result card
      const visibleHeight = window.innerHeight - 100; // minus some top nav height

      const count = Math.ceil(visibleHeight / cardHeight);
      setSkeletonCount(count);
    };

    calculateSkeletonCount();
    window.addEventListener("resize", calculateSkeletonCount);

    return () => window.removeEventListener("resize", calculateSkeletonCount);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getSearchResults();
  }, [query]);

  const getSearchResults = async () => {
    const res = await fetch(YOUTUBE_SEARCH_RESULT_API + query);
    const json = await res.json();
    setVideos(json?.items || []);
    setIsLoading(false);
  };

  return (
    <div className={isMenuOpen ? "ml-56 flex-1 p-4" : "p-4"}>
      {isLoading
        ? Array(skeletonCount)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-4 mb-6">
                <SkeletonLoader
                  width="320px"
                  height="180px"
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-3 flex-1">
                  <SkeletonLoader height="20px" width="90%" />
                  <SkeletonLoader height="16px" width="60%" />
                  <SkeletonLoader height="14px" width="70%" />
                </div>
              </div>
            ))
        : videos.map((video) => (
            <SearchResultsCard
              key={video.id.videoId || video.id}
              info={video}
            />
          ))}
    </div>
  );
};

export default SearchResults;
