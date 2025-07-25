import React from 'react';
import Sidebar from './compontants/sidebar.jsx';
import Content from './compontants/content';
import Top from './compontants/top.jsx';

import './App.css';


const HomePage = () => {
  return (
    <div >
        {/* <Top /> */}
    <div className="homepage">
        <Content />
        <Sidebar />
    </div>
       

    </div>
  );
};

export default HomePage;
