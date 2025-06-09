import React, { useState, useEffect } from 'react';

function ArabicQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('https://dr-almotawa-quotes.p.rapidapi.com/getRandomQuote?limit=50', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '944e29bb69mshd663fed23dc834dp1ae5cbjsn3ffd017dbf51',
        'X-RapidAPI-Host': 'dr-almotawa-quotes.p.rapidapi.com'
      }
    })
      .then(res => res.json())
      .then(data => {
        setQuote(data.wisdom.text);
        // setAuthor(data.author);
console.log(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div dir="rtl" style={{ textAlign: 'right', fontSize: '18px', padding: '20px' }}>
      <p style={{ marginTop: '100px', fontWeight: 'bold' }}></p>
      <p>"{quote}"</p>
    </div>
  );
}

export default ArabicQuote;
