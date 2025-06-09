import React from 'react';
import Top from './top';
import Article from './article';
import ArabicQuote from './quotesApi.jsx';
import QuoteSlider from "./wise.jsx"


const content = () => {
  return (<>
      <Top />
      {/* <ArabicQuote /> */}
      <QuoteSlider/>
      <Article />
  </>
  )
}

export default content