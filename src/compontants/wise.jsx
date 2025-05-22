import React, { useEffect, useState } from "react";
import * as framer from 'framer-motion';
const { motion, AnimatePresence } = framer;



export default function QuoteSlider() {
  const [index, setIndex] = useState(0);
  const [data, setdata] = useState(0);


  useEffect(() => {
    fetch('http://localhost:4000/quotes')
    .then(res => res.json())
      .then(data => {
        setdata(data);
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        console.log(randomQuote.quote, "-", randomQuote.author);
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % data.length);
          }, 5000);
      
          return () => clearInterval(interval);
      });
  }, []);


  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 rounded-xl"
    style={{
        backgroundImage: `url('./image/banner_2.jpg')`, // ضع مسار الصورة هنا
        width: "100%",
        height: "150px"
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-center text-gray-800"
          style={{
            width: "100%",
            height: "150px"
          }}
        >
          {data[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


