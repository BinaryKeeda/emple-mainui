const VideoTutorial = ({ title, videoUrl, description }) => {
  const getVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <details className="group">
        <summary className="cursor-pointer bg-gray-100 p-4 text-lg font-medium text-gray-800 hover:bg-gray-200">
          {title}
        </summary>
        <div className="p-4 bg-white">
          <iframe
            className="w-full h-64"
            src={embedUrl}
            title={description}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </details>
    </div>
  );
};

export default VideoTutorial;
