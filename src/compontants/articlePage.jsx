import React, { useEffect, useState } from 'react';
import Top from './top';
import { database } from './firebase';
import { ref, onValue } from "firebase/database";
import img from 'F:/tiar/tiar/src/compontants/421098210_222801950890615_800056585450224398_n.webp';
import Articlereading from './articlereading.jsx';
import { Link } from 'react-router-dom';  // استيراد Link من react-router-dom
import ArticleBox from './articleBox';



const ArticlePage = () => {
 


  return (
    <>
     <ArticleBox top={<Top/>}></ArticleBox>
    </>
  );
};

export default ArticlePage;
