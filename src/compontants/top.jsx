/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import '../App.css';
import ArticleBox from "./articleBox.jsx";
import google from "../image/search.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from "./firebase.js";
import { emit,on, off  } from './eventBus';


const Top = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    emit('sendValue', searchTerm); // هذا ما سيُرسل إلى ArticleBox
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setSearchTerm('');
  };

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User logged in:", user);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <header className="top">
        <button onClick={()=>{handleLogin()}} className="login-button"> Login <img src={google} /></button>

      <div className="search-container">
        <form className="wrap" onSubmit={handleSubmit}>
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="ابحث هنا"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir={navigator.language === 'ar' ? 'rtl' : 'ltr'}
            />
            <button type="submit" className="searchButton">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              </svg>
            </button>


            <button type="submit" className="delete" onClick={(e)=>{handleDelete(e)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
            </button>
          </div>
        </form>
      </div>
     

      <div className="logo-center">
        <div className="img"></div>
        <div className="company_name"><a href="#"> bypen </a></div>
      </div>
    </header>
  );
};

export default Top;

