export const GOOGLE_API_KEY = "AIzaSyBq5lbcWDiFedkBve3vR0cbN7l2ANYEIjI";
const proxy = "https://cors-anywhere.herokuapp.com/";

export const LIVE_CHAT_COUNT = 25;

export const YOUTUBE_SEARCH_RESULT_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&key=${GOOGLE_API_KEY}&q=`;

export const YOUTUBE_VIDEOS_API =
  proxy +
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  GOOGLE_API_KEY;
export const COMMENTS_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=";
export const YOUTUBE_SEARCH_API =
  proxy +
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const userIcon =
  "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
// Live Chat >>>> Infinite Scroll >>>>>> Pagination
