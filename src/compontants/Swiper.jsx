import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Swiper.css"; // ملف CSS الخاص بك
import img1 from "./436497704_294190667085076_892865275279403148_n.webp";
import img2 from "./438159951_289956384175171_1080222582501031471_n.webp";
import img3 from "./448250306_313982998439176_5435646305438478702_n.webp";
import img4 from "./443712680_296661696837973_3045588710245234298_n.webp";
import img5 from "./417570499_223418844162259_5867619198353707610_n.jpg";

// Import Swiper modules
import { Pagination, Navigation } from 'swiper/modules';


const ImageSlider = () => {
  return (
    <Swiper
    slidesPerView={'auto'}
        centeredSlides={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={img1} alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3}  alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img5} alt="Slide 4" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
