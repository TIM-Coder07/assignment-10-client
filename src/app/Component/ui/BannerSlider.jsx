"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
    >
      <SwiperSlide>
        <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
          <img
            src="https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg"
            alt="Book 1"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
          <img
            src="https://covers.openlibrary.org/b/isbn/9780439139595-L.jpg"
            alt="Book 1"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
          <img
            src="https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg"
            alt="Book 1"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </SwiperSlide>

    </Swiper>
  );
}
