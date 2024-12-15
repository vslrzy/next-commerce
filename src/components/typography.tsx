'use client';

import { GetContext } from '@/libs/base';

export const ListHeader = ({ passed, center }: any) => {
  //Context
  const { localTheme } = GetContext();
  return (
    <h1
      className={`py-10 font-bold text-xl sm:text-md text-center sm:text-left ${
        localTheme == 'false' ? 'text-dark' : 'text-white'
      } ${center == true && 'text-center'}`}
    >
      <span>{passed}</span>
    </h1>
  );
};
