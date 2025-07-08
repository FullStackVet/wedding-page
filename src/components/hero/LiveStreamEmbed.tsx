// livestream window based on FB live
// switch from countdown to this on wedding start
import React from "react";

interface LiveStreamProps {
  url: string;
}

const LiveStreamEmbed = ({ url }: LiveStreamProps) => (
  <div className="aspect-video bg-black rounded-xl overflow-hidden">
    <iframe
      title="Groom & Person's Wedding Live Stream"
      /*Get the livestream URL*/
      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false`}
      width="100%"
      height="100%"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      aria-label="Live video stream of Groom and Person's wedding"
    ></iframe>
  </div>
);

export default LiveStreamEmbed;
