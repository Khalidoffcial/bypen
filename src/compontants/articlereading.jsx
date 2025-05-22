import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { database } from './firebase';
import { ref, onValue } from "firebase/database";
import Top from './top';
import { ref as storageRef, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
import { storage } from './firebase'; // استيراد إعدادات Firebase
import 'react-quill/dist/quill.snow.css'; // تضمين تنسيقات Quill
import img from 'F:/tiar/tiar/src/compontants/421098210_222801950890615_800056585450224398_n.webp';

const Articlereading = () => {
  const { articleId } = useParams();
  const [content, setContent] = useState('');
  const [DataArticle, SetdataArticle] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
useEffect(()=>{
const artcleref = ref(database, `articles/article${articleId}`);
    onValue(artcleref, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        SetdataArticle(data);
      }
   });
   const fetchImageUrl = async () => {
    const imageRef = storageRef(storage, `images/image${articleId}`);
    try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
    } catch (error) {
        console.error('Error fetching image URL:', error);
    }
};

fetchImageUrl();
},[])



  return (<>
    <Top />
    <div className="w">
    </div>
      <div className="article_information">
        <div className="img_article">
            <img src={imageUrl} alt=""/>
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