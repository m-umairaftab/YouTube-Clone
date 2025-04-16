const RelatedVideoCard = ({ info }) => {
  const { snippet } = info;
  return (
    <div className="w-72 m-2 cursor-pointer">
      <a href={`/watch?v=${info.id.videoId}`}>
        <img
          className="rounded-lg w-full"
          src={snippet?.thumbnails?.medium?.url}
          alt="thumbnail"
        />
        <h3 className="font-bold text-sm mt-2">{snippet?.title}</h3>
        <p className="text-xs text-gray-600">{snippet?.channelTitle}</p>
      </a>
    </div>
  );
};

export default RelatedVideoCard;
