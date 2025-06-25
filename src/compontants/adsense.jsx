import { useEffect } from 'react';

function PropellerAd() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://shoukigaigoors.net/act/files/tag.min.js?z=9491660";
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      
  
    return null;
  }

export default PropellerAd;
