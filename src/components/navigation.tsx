'use client';

import { GetContext } from '@/libs/base';
import {
  faBars,
  faBasketShopping,
  faSearch,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Basket, sumItems } from './basket';
import { useState } from 'react';
import { NavbarSearchModal } from './searchModals';

export default function Navbar({ local }: any) {
  //Context data
  const { theme, setTheme } = GetContext();
  const { localTheme } = GetContext();
  console.log(localTheme);
  const cart: any[] =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];
  const { passed } = GetContext();

  //
  const [searchBar, setSearchBar] = useState(true);
  const passedStyle = {
    container: [
      `absolute top-[85px] left-0 w-full h-auto overflow-hidden ${
        searchBar ? 'hidden' : 'block'
      }`,
    ],
    childContainer: [
      `w-full p-4 border-1 shadow-xl rounded-md ${
        localTheme == 'false' ? 'bg-white' : 'bg-dark border-rgreen'
      }`,
    ],
    form: 'w-full flex justify-start items-center gap-2 text-xs font-semibold',
    input: [
      `border-1 w-full outline-none px-5 py-2 rounded-md ${
        localTheme == 'false'
          ? 'bg-white text-dark'
          : 'bg-dark text-rgreen border-rgreen'
      }`,
    ],
    link: 'bg-rgreen text-white py-2 px-5 rounded-md',
  };

  //Toggle state
  const [toggle, setToggle] = useState(true);

  //
  const [menu, setMenu] = useState(true);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 border-b-1 border-rgreen ${
        localTheme == 'false' ? 'bg-whiteGrey' : 'bg-dark'
      }`}
    >
      {/*Top*/}
      <div className="w-full relative h-[80px] border-[rgba(0,0,0,0.1)]">
        <section className="w-full h-full flex items-center justify-between relative">
          <div className="flex items-center justify-start gap-5">
            <Logo />
            {/*Search*/}
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: localTheme == 'false' ? 'black' : 'white' }}
              className="cursor-pointer"
              onClick={() => {
                setSearchBar(!searchBar);
              }}
            />
            {/*Search*/}

            {/*Toggler*/}
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: localTheme == 'false' ? 'black' : 'white' }}
              className="cursor-pointer"
              onClick={() => {
                setMenu(!menu);
              }}
            />
            {/*Toggler*/}

            {/*Theme toggler*/}
            <div
              className={`inline-block relative text-xl flex items-center justify-center rounded-full w-[24px] h-[24px] cursor-pointer`}
              onClick={() => {
                setTheme(!theme);
                localStorage.setItem(local, theme);
              }}
            >
              {localTheme == 'false' ? (
                <FontAwesomeIcon icon={faToggleOff} />
              ) : (
                <FontAwesomeIcon icon={faToggleOn} />
              )}
            </div>
            {/*Theme toggler*/}
          </div>

          <div className="flex gap-3 items-center">
            {/*Basket*/}
            <span
              onClick={() => {
                setToggle(!toggle);
              }}
              className="flex items-start relative"
            >
              <FontAwesomeIcon
                icon={faBasketShopping}
                className={`${
                  localTheme == 'false' ? 'text-dark' : 'text-white'
                } text-lg cursor-pointer`}
              />
              <span
                className={`text-xxs font-semibold ${
                  localTheme == 'false' ? 'text-dark' : 'text-white'
                }`}
              >
                {cart && cart.length}
              </span>
            </span>
            {/*Basket*/}
          </div>

          {/*Basket*/}
          <Basket toggleState={toggle} />
          {/*Basket*/}

          {/*Search Modal*/}
          <NavbarSearchModal passedStyle={passedStyle} />
          {/*Search Modal*/}

          {/*Nav Menu*/}
          {passed.categories && (
            <div
              className={`absolute sm:top-[85px] top-[80px] sm:left-6 left-0 border-1 p-6 sm:shadow-big right-0 sm:right-auto sm:rounded-md sm:w-auto w-full ${
                menu ? 'hidden' : 'block'
              } ${
                localTheme == 'false'
                  ? 'bg-white text-dark'
                  : 'bg-dark text-white border-rgreen'
              }`}
            >
              <div>
                <h1 className="font-bold text-sm pb-4">Categories</h1>
                <div className="flex flex-col gap-2">
                  {passed.categories.map((category: any) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      onClick={() => {
                        setMenu(true);
                      }}
                      className="font-semibold text-xs border-b-1"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/*Nav Menu*/}
        </section>
      </div>
    </header>
  );
}

//Logo
export const Logo = () => {
  //Context data
  const context_data = GetContext();
  const logo_data = context_data.passed.logo;
  const { localTheme } = GetContext();

  return (
    <Link href={'/'}>
      <Image
        priority
        src={logo_data[localTheme == 'false' ? '1' : '0'].logoImage.url}
        alt={logo_data['1'].logoImage.id}
        width={'300'}
        height={'300'}
        className="w-auto h-[50px]"
      />
    </Link>
  );
};
