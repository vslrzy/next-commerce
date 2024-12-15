'use client';

import { GetContext } from '@/libs/base';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ product }: any) {
  //Context
  const { localTheme } = GetContext();
  const { addToCart, increase, cartItems, sumItems, itemCount } = GetContext();

  //Check the cart
  const IsInCart = (produc: any) => {
    return !!cartItems.find((item: any) => item.id === product.id);
  };
  return (
    <div
      className={`${
        localTheme == 'false' ? 'border-white bg-white' : 'border-rgreen'
      } border-1 rounded-md flex flex-col overflow-hidden`}
    >
      <Link
        href={`/product/${product.slug}`}
        className="w-full bg-white p-9 flex items-center justify-center h-[150px]"
      >
        <Image
          src={product.images['0'].url}
          alt={product.images['0'].id}
          width={'300'}
          height={'300'}
          className="w-auto h-full"
        />
      </Link>
      <div className="flex flex-col gap-3 p-3 text-xs">
        <Link
          href={`/product/${product.slug}`}
          className={`${
            localTheme == 'false' ? 'text-dark' : 'text-white'
          } text-xs font-bold truncate`}
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between">
          <Link
            href={`/category/${product.categories['0'].slug}`}
            className="font-bold truncate text-rgreen"
          >
            {product.categories['0'].name}
          </Link>
          <span className="bg-rgreen px-3 py-2 rounded-sm text-white min-w-[60px]">
            {product.price} $
          </span>
        </div>
      </div>

      <span
        className="text-white text-xs font-medium rounded-sm bg-rgreen px-5 py-2 text-center m-1 cursor-pointer"
        onClick={() => {
          !IsInCart(product) ? addToCart(product) : increase(product);
        }}
      >
        Add to cart
      </span>
    </div>
  );
}
