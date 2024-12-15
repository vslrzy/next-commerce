'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  FreeMode,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { GetContext } from '@/libs/base';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faArrowRight,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { SearchModal } from './searchModals';

export default function BannerSlider() {
  //Bannner data from Context
  const data = GetContext();
  const { localTheme } = GetContext();
  const banners = data.passed.banners;
  const categories = data.passed.categories;

  return (
    <div className="w-full mt-6">
      {/*Bottom*/}
      <div className="w-full relative h-[60%] border-b-1 border-rgreen">
        <div className="search-background w-full h-[140px]">
          <section className="w-full h-full flex items-center justify-center">
            <SearchModal />
          </section>
        </div>
      </div>
      {/*Bottom*/}
      {/*Info section*/}
      <section className="relative z-20 mt-[-20px]">
        <div
          className={`${
            localTheme == 'false'
              ? 'bg-white text-dark'
              : 'bg-dark text-white shadow-big border-rgreen border-1'
          } w-full rounded-md flex sm:flex-row flex-col justify-between items-center shadow-xl px-3 sm:px-9 py-4 sm:py-5`}
        >
          <div className="flex w-full items-center gap-2">
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-[25px] sm:text-[33px]"
            />
            <span>
              <h1 className="text-xs sm:text-md font-bold">
                Request for Quotation
              </h1>
              <h2 className="text-xxs sm:text-xs font-medium">
                One request, multiple quotes
              </h2>
            </span>
          </div>

          <div className="flex w-full items-center gap-2 sm:border-r-1 sm:border-l-1 sm:px-8 py-2 sm:py-0">
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-[25px] sm:text-[33px]"
            />
            <span>
              <h1 className="text-xs sm:text-md font-bold">Ready to Ship</h1>
              <h2 className="text-xxs sm:text-xs font-medium">
                Order directly with fast dispatch
              </h2>
            </span>
          </div>

          <div className="flex w-full items-center gap-2 sm:ml-6">
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-[25px] sm:text-[33px]"
            />
            <span>
              <h1 className="text-xs sm:text-md font-bold">
                Logistics services
              </h1>
              <h2 className="text-xxs sm:text-xs font-medium">
                Reliable shipping by ocean and air
              </h2>
            </span>
          </div>
        </div>
      </section>
      <section className="w-full mt-2">
        <div
          className={`${
            localTheme == 'false'
              ? 'bg-white text-dark'
              : 'bg-dark text-white shadow-big border-rgreen border-1'
          } rounded-md shadow-normal flex sm:flex-row flex-col w-full p-2 gap-5`}
        >
          {/*Category section*/}
          {categories && (
            <div className={`hidden sm:w-[22%] sm:flex flex-col gap-3 py-2`}>
              <h1 className="text-xl font-bold">Categories</h1>
              <div className="flex flex-col">
                {categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className={`${
                      localTheme == 'false' ? 'border-dark' : 'border-rgreen'
                    } text-sm font-medium border-b-1 py-[2px] flex justify-between items-center`}
                  >
                    {category.name}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/*Category section*/}

          {/*Slider section*/}
          {banners && (
            <div className="sm:w-[60%]">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {banners.map((banner: any) => (
                  <SwiperSlide key={banner.bannerImage.id}>
                    <Image
                      src={banner.bannerImage.url}
                      alt={banner.bannerImage.id}
                      width={'2000'}
                      height={'2000'}
                      priority
                      className="w-full h-[150px] sm:h-[330px] object-cover rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/*Slider section*/}

          {/*Show section*/}
          <div className="sm:w-[18%] hidden sm:flex flex-col gap-5 py-3">
            <Link
              href={'/'}
              className="text-sm font-bold flex items-center justify-between text-rgreen"
            >
              Explore all products
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Link>
            <span className="block bg-rgreen text-white font-bold p-4 rounded-md text-sm">
              US $10 off with a new supplier
            </span>
            <span className="block bg-rgreen text-white font-bold p-4 rounded-md text-sm">
              RFQ: quotes with supplier preferences
            </span>
            <Link
              href={'/'}
              className="bg-rgreen text-sm font-medium text-white px-8 py-2 rounded-md flex items-center justify-between"
            >
              View More
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          {/*Show section*/}
        </div>
      </section>
    </div>
  );
}

//Categories slider
export const CategoriesSlider = () => {
  //Categories data from Context
  const { localTheme } = GetContext();
  const data = GetContext();
  const categories = data.passed.categories;

  return (
    <>
      {categories && (
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {categories.map((category: any) => (
            <SwiperSlide key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className="border-2 p-5 bg-whiteGrey my-10 sm:min-h-[240px] text-center flex justify-center items-center flex-col gap-5 shadow-xl rounded-md"
              >
                <Image
                  src={category.categoryImage.url}
                  alt={category.categoryImage.id}
                  width={'300'}
                  height={'300'}
                />
                <span
                  className={`${
                    localTheme == 'false' ? 'text-rgreen' : 'text-dark'
                  } text-xxs sm:text-xs font-bold`}
                >
                  {category.name}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

//For single product page
export const ImageSlider = ({ images }: any) => {
  //Thumbs for swiper
  const [thumbsSwiper, setThumbsSwiper] = useState();
  return (
    <div className="border-1 p-10">
      <Swiper
        loop={false}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, FreeMode]}
      >
        {images &&
          images.map((image: any) => (
            <SwiperSlide
              key={image.id}
              className="h-[200px!important] sm:h-[450px!important] flex items-center"
            >
              <Image
                src={image.url}
                alt={image.id}
                width={'1000'}
                height={'1000'}
                className="h-full w-auto p-5 mx-auto"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images &&
          images.map((image: any) => (
            <SwiperSlide
              key={image.id}
              className="w-[50px!important] sm:w-[100px!important]"
            >
              <Image
                src={image.url}
                alt={image.id}
                width={'1000'}
                height={'1000'}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
