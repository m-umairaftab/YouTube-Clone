import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdWhatshot,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdWatchLater,
  MdThumbUp,
  MdMusicNote,
  MdSportsSoccer,
  MdSportsEsports,
  MdMovie,
  MdLiveTv,
  MdOutlineExplore,
} from "react-icons/md";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="fixed  left-0 h-[calc(100vh-56px)] overflow-y-auto p-3 pr-6 shadow-lg w-56 text-sm font-medium">
      {/* Main Navigation */}
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdHome size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdOutlineExplore size={20} />
            <span>Explore</span>
          </Link>
        </li>
        <li>
          <Link
            to="/shorts"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdWhatshot size={20} />
            <span>Shorts</span>
          </Link>
        </li>
        <li>
          <Link
            to="/subscriptions"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdSubscriptions size={20} />
            <span>Subscriptions</span>
          </Link>
        </li>
      </ul>

      <hr className="my-3" />

      {/* Library */}
      <ul className="space-y-2">
        <li>
          <Link
            to="/library"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdVideoLibrary size={20} />
            <span>Library</span>
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdHistory size={20} />
            <span>History</span>
          </Link>
        </li>
        <li>
          <Link
            to="/watch-later"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdWatchLater size={20} />
            <span>Watch Later</span>
          </Link>
        </li>
        <li>
          <Link
            to="/liked"
            className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2"
          >
            <MdThumbUp size={20} />
            <span>Liked Videos</span>
          </Link>
        </li>
      </ul>

      <hr className="my-3" />

      {/* Subscriptions */}
      <h1 className="px-2 text-gray-500 uppercase text-xs">Subscriptions</h1>
      <ul className="space-y-2 mt-1">
        <li className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
          <MdMusicNote size={20} />
          <span>Music</span>
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
          <MdSportsSoccer size={20} />
          <span>Sports</span>
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
          <MdSportsEsports size={20} />
          <span>Gaming</span>
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
          <MdMovie size={20} />
          <span>Movies</span>
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
          <MdLiveTv size={20} />
          <span>Live</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
