const GOOGLE_API_KEY = "AIzaSyBq5lbcWDiFedkBve3vR0cbN7l2ANYEIjI";

export const LIVE_CHAT_COUNT = 25;

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  GOOGLE_API_KEY;

const proxy = "https://cors-anywhere.herokuapp.com/";
export const YOUTUBE_SEARCH_API =
  proxy +
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
// Live Chat >>>> Infinite Scroll >>>>>> Pagination
