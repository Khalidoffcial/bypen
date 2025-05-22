import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { database } from './firebase';
import { ref, onValue } from "firebase/database";
import Top from './top';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase.js'; // استيراد إعدادات Firebase
import 'react-quill/dist/quill.snow.css'; // تضمين تنسيقات Quill

const Articlereading = () => {
  const { articleId } = useParams();
  const [DataArticle, SetdataArticle] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    if (!articleId) {
      console.error("articleId غير معرف");
      return;
    }
  
    const artcleref = ref(database, `articles/article${articleId}`);
    onValue(artcleref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        SetdataArticle(data);
      }
    });
  
    const fetchImageUrl = async (artid) => {
      if(artid){
        console.log(artid);
        
        const imgRef = storageRef(storage, `images/image${artid}`);
        try {
          const url = await getDownloadURL(imgRef);
          console.log(url);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }
    };
  
    fetchImageUrl(articleId);
  }, [articleId]);



  return (<>
    <Top />
    <div className="w">
    </div>
      <div className="article_information">
        <div className="img_article">
            {imageUrl? (<img src={imageUrl} alt=""/>): (null)}
            </div>
        <div className='title'>{DataArticle.title} </div>
        <div className='descrip'>{DataArticle.descrip}
        </div>
        <div className='his'>{DataArticle.date} </div>

        <div className="content_Article" dangerouslySetInnerHTML={{ __html: DataArticle.content }} />
      </div>
  </>

  )
}

export default Articlereading