// SearchResultsCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResultsCard = ({ info }) => {
  const navigate = useNavigate();
  const { snippet } = info;
  const { thumbnails, title, channelTitle, description } = snippet;

  const handleCardClick = () => {
    // Navigate to the Watch Page with the selected video's ID as query param
    navigate(`/watch?v=${info.id.videoId}`);
  };

  return (
    <div
      className="flex mb-6 w-full cursor-pointer hover:bg-gray-100 p-2 rounded-xl transition"
      onClick={handleCardClick}
    >
      <img
        src={thumbnails?.medium?.url}
        alt="thumbnail"
        className="w-80 h-48 rounded-xl object-cover"
      />
      <div className="ml-4 flex flex-col justify-start">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{channelTitle}</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default SearchResultsCard;
