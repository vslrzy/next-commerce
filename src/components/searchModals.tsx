'use client';

import { GetContext } from '@/libs/base';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useState } from 'react';

export const SearchModal = () => {
  const [query, setQuery] = useState('');
  //Context
  const { localTheme } = GetContext();
  return (
    <form
      className={`mx-auto border-1 border-rgreen h-[40px] sm:h-[50px] flex justfiy-center max-w-[700px] w-full rounded-full overflow-hidden items-center sm:px-3 sm:py-2 p-1 ${
        localTheme == 'false' ? 'text-dark bg-white' : 'text-rgreen bg-dark'
      }`}
    >
      <input
        type="search"
        className={`w-full text-xxs sm:text-xs outline-none px-3 font-medium bg-transparent ${
          localTheme == 'false' ? 'text-dark' : 'text-rgreen'
        }`}
        placeholder="Search here"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Link
        href={`/search?query=${query}`}
        className="px-8 text-white border-1 border-rgreen rounded-full h-full flex items-center justify-center bg-rgreen text-xxs sm:text-xs font-medium"
      >
        Search
      </Link>
    </form>
  );
};

export const NavbarSearchModal = ({ passedStyle }: any) => {
  return (
    <section className={passedStyle.container}>
      <div className={passedStyle.childContainer}>
        <form
          className={passedStyle.form}
          onSubmit={() => {
            console.log('Submitted');
          }}
        >
          <input
            type="search"
            placeholder="Search here"
            className={passedStyle.input}
          />
          <Link href="/" className={passedStyle.link}>
            Search
          </Link>
        </form>
      </div>
    </section>
  );
};
