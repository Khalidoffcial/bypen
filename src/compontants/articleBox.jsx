import React, { useEffect, useState } from 'react';
import Top from "./top.jsx";
import ArticleDAO from './Dao.js';
import Sidebar from './sidebar.jsx';
import { Link } from 'react-router-dom';
import { storage } from './firebase';
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropellerAd from './adsense.jsx';
import PushBannerAd from './PushBannerAd.jsx';
import InterstitialAd from './InterstitialAd.jsx';
import VignetteAd from './VignetteAd.jsx';

import { on, off } from './eventBus';


const ArticleBox = () => {
    const { typeArticle } = useParams();
  const [DataArticle, SetdataArticle] = useState([]);
  const [filteredArticles, set_filteredArticles] = useState(DataArticle);
  const [imageUrls, setImageUrls] = useState({});
  const [isback, setBack] = useState(false);
  const [filter, SetFilter] = useState('');

  const location = useLocation();
  const isHome = location.pathname === "/";  // أو "/home"
  const dynamicClass = isHome ? "home" : "other";

  const handleValue = (data) => SetFilter(data);
  useEffect(() => {
    on('sendValue', handleValue);

    return () => {
      off('sendValue', handleValue); // نظافة
    };
  }, []);

  function handleDelete(e){
    e.preventDefault();
    off('sendValue', handleValue); // نظافة
    set_filteredArticles(DataArticle);
    setBack(false);
  }
  useEffect(() => {
    const dao = new ArticleDAO();
    dao.getArticle().then((data) => {
      if (data) {
        const articlesArray = Object.values(data);
        SetdataArticle(articlesArray);
        // set_filteredArticles(articlesArray); // افتراضياً اعرض كل المقالات
      }
    });
    const fetchImages = async () => {
      try {
        const imagesRef = storageRef(storage, 'images');
        const response = await listAll(imagesRef);

        if (response && response.items) {
          const urlsPromises = response.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const id = item.name.split('.')[0]; // استخراج معرف المقالة من اسم الصورة
            return { id, url };
          });

          const urlsArray = await Promise.all(urlsPromises);
          const urlsObject = urlsArray.reduce((acc, { id, url }) => {
            acc[id] = url;
            return acc;
          }, {});

          setImageUrls(urlsObject);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);




  useEffect(() => {
    if (filter) {
      console.log(filter);
      const filtered = DataArticle.filter(article =>
        (article.title && article.title.toLowerCase().includes(filter.toLowerCase())) ||
        (article.content && article.content.toLowerCase().includes(filter.toLowerCase())) ||
        (article.descrip && article.descrip.toLowerCase().includes(filter.toLowerCase())) ||
        (article.type && article.type.toLowerCase().includes(filter.toLowerCase()))
      );
      set_filteredArticles(filtered);
      setBack(true);
    } else {
      
      const filteredArticles = DataArticle.filter(article =>
        article.type?.includes(typeArticle)
      );
      
      set_filteredArticles(filteredArticles);
    }
  }, [filter,DataArticle]);
  
console.log(filteredArticles);
console.log(filter);
useEffect(()=>{
  if (!typeArticle || typeof(typeArticle) == "undefined") {
    console.log(DataArticle);
    set_filteredArticles(DataArticle);
  
    console.log("dont there the type article");
  console.log(typeArticle);
  };
},[DataArticle])

const capitalizeFirstLetter = (word) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};


  return (
    <>
    <PropellerAd />
    {/* <PushBannerAd />
    <InterstitialAd />
    <VignetteAd /> */}
    
    <Top></Top>
    <Sidebar></Sidebar>
      <div className={`service_${dynamicClass}`}>
        <h1 className="address1">{capitalizeFirstLetter(typeArticle)}</h1>
        {isback?(
          <button className="back" onClick={handleDelete}>
              <h1>رجوع</h1>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
            </button>):(null)}
        <div className="boxes" dir='rtl'>
          {filteredArticles.length ? (
            filteredArticles.map((item) => (
              <Link to={`/Articles/${item.id}`} className='hyperlinkBox'>
              <div className="box" key={item.id}>
                <div className="TopBox">
                  {imageUrls[`image${item.id}`] ? (
                    <img
                      src={imageUrls[`image${item.id}`]}
                      alt={item.title}
                      style={{ width: '100%', maxWidth: '500px' }}
                    />
                  ) : (
                    null
                  )}
                </div>
                <div className='BottomBox'>
                  
                    <h1>{item.title}</h1>
                    <h4 className='description'>{item.descrip}</h4>
                    <p className='history'>{item.date}</p>
                  
                  {/* {(Prop_handleToUpdate || Prop_handleRemove) && (
                    <div className='button_mange'>
                      {Prop_handleToUpdate && (
                        <div className="updateArticle" onClick={() => { Prop_handleToUpdate(item.id); }}>
                          <img src={updata} alt="تحديث" />
                        </div>
                      )}
                      {Prop_handleRemove && (
                        <div className="removeArticle" onClick={() => { Prop_handleRemove(item.id); }}>
                          <img src={remove} alt="حذف" />
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
              </Link>
            ))
          ) : (
            <div className='parentDontfound'>
              <div className='dontfound'>لا توجد نتائج</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleBox;
