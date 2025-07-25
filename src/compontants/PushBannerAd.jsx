// PushBannerAd.jsx
import { useEffect } from "react";

const PushBannerAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://fpyf8.com/88/tag.min.js";
    script.async = true;
    script.setAttribute("data-zone", "9491661");
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default PushBannerAd;
