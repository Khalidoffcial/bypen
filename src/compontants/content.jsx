import React from 'react';
import ArticleBox from './articleBox.jsx';
import QuoteSlider from "./wise.jsx"


const content = () => {
  return (<>
  <div className="content">
      <QuoteSlider/>
      <ArticleBox />
  </div>
  </>
  )
}

export default content