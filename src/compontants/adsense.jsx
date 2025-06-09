import { useEffect } from 'react';

const InfolinksAd = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerHTML = `
      var infolinks_pid = XXXXXXX;
      var infolinks_wsid = X;
    `;

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = 'https://resources.infolinks.com/js/infolinks_main.js';
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      // تنظيف عند إزالة الإعلان
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null;
};

export default InfolinksAd;
