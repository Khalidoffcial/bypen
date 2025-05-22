import React, { useEffect, useState } from 'react';

import ArticleBox from './articleBox';


const Article = () => {
 const [id,SetId]=useState()
  return (
    <>
   <ArticleBox isMore="true" 
     
     idItem={(e)=>{SetId(e)}}

   />
    </>
  );
};

export default Article;
