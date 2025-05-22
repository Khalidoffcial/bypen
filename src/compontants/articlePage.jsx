import React, { useEffect, useState } from 'react';
import Top from './top';
import { database } from './firebase';
import { ref, onValue } from "firebase/database";
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
