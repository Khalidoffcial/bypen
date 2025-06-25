import { useEffect } from 'react';

function PropellerAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://upskittyan.com/act/files/tag.min.js?z=9491311";
        script.async = true;
        script.setAttribute("data-cfasync", "false");
      
        script.onerror = () => {
          alert("يرجى تعطيل مانع الإعلانات لدعم الموقع 👍");
        };
      
        document.body.appendChild(script);
      }, []);
  
    return null;
  }

export default PropellerAd;
