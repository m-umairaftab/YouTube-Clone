import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { userIcon, YOUTUBE_SEARCH_API } from "../utils/constants";

const Head = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setSearchQuery(q);
  }, []);

  useEffect(() => {
    // console.log(searchQuery);

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSugsestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSugsestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);

    // update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 shadow-lg sticky top-0 z-50 bg-white">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10 justify-center items-center">
        <div className="flex justify-center">
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href =
                  "/search?q=" + encodeURIComponent(searchQuery);
              }
            }}
          />
          <button
            onClick={() => {
              window.location.href =
                "/search?q=" + encodeURIComponent(searchQuery);
            }}
            className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 cursor-pointer"
          >
            🔍
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute bg-white py-2 px-0 w-[39rem] mt-12 shadow-lg rounded-lg border border-gray-100">
              <ul className="list-none m-0 p-0">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="w-full py-2 px-4 hover:bg-gray-100"
                    onMouseDown={(e) => {
                      // Use onMouseDown instead of onClick to avoid blur firing first
                      e.preventDefault(); // Prevent default behavior
                      setSearchQuery(s); // Update input
                      window.location.href =
                        "/search?q=" + encodeURIComponent(s);
                    }}
                  >
                    🔍 {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <img className="h-8" alt="user" src={userIcon} />
      </div>
    </div>
  );
};

export default Head;
