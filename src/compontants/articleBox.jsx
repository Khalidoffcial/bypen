import React, { useEffect, useState } from 'react';
import Top from "./top.jsx"
import ArticleDAO from './Dao.js';
import { Link } from 'react-router-dom';
import { storage, database } from './firebase';
import { ref as dbRef, onValue } from "firebase/database";
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';

const ArticleBox = (props) => {
  const { top: isTop, isMore: isMore, Buttons : isButtons,idItem } = props;
  const [DataArticle, SetdataArticle] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    // جلب المقالات من Firebase Database
    const dao = new ArticleDAO();
    dao.getArticle().then((data) => {
      if (data) {
        SetdataArticle(Object.values(data));
      }
    });

    // جلب الصور بناءً على معرف المقالة
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
        } else {
          console.error('No images found in the specified path');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      {isTop ? <Top /> : console.log("no there")}
      <div className="service">
        <h1 className="address1">مقالات</h1>
        <div className="boxes" dir='rtl'>
          {DataArticle.map((item) => (
            <div className="box" key={item.id}>

                <div className="TopBox">
                {imageUrls[`image${item.id}`] ? (
                  <img src={imageUrls[`image${item.id}`]} alt={item.title} style={{ width: '100%', maxWidth: '500px' }} />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className='BottomBox'>
              <Link 
              to={{
                pathname: `/articles/${item.id}`,
                state: { article: item }
              }} 
              key={item.id}
            >
                <h1>{item.title}</h1>
                <h4 className='description'>{item.descrip}</h4>
                <p className='history'>{item.date}</p>
            </Link>
                {isButtons? (isButtons):(console.log("no there"))}                </div>
             
              <div>
              {idItem && typeof idItem === 'function' ? idItem(item.id) : console.log("idItem is not a function")}
              </div>
            </div>
          ))}
        </div>
        {isMore && DataArticle.length >= 6 && (
          <Link to="/articles">
            <div className="more">المزيد من المقالات</div>
          </Link>
        )}
      </div>
    </>
  );
};

export default ArticleBox;
