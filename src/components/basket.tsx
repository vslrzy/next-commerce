'use client';

import { GetContext } from '@/libs/base';
import Link from 'next/link';
import { MiniDivider } from './divider';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const CHECKOUT = 'CHECKOUT';
export const CLEAR = 'CELAR';

const Storage = (cartItems: any) => {
  const isLocalStorageAvialable = typeof localStorage !== 'undefined';
  isLocalStorageAvialable &&
    localStorage.setItem(
      'cart',
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};

export const sumItems = (cartItems: any) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total: any, product: any) => total + product.quantity,
    0
  );

  let total = cartItems
    .reduce(
      (total: any, product: any) => total + product.price * product.quantity,
      0
    )
    .toFixed(2);

  return { itemCount, total };
};

const CartReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cartItems.find((item: any) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case REMOVE_ITEM:
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item: any) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item: any) => item.id !== action.payload.id
          ),
        ],
      };

    case INCREASE:
      state.cartItems[
        state.cartItems.findIndex((item: any) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case DECREASE:
      state.cartItems[
        state.cartItems.findIndex((item: any) => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case CHECKOUT:
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };

    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
      };

    default:
      return state;
  }
};

export const Basket = ({ toggleState }: any) => {
  //Context props
  const { cartItems } = GetContext();
  const { localTheme } = GetContext();

  //
  const sumPrice = sumItems(cartItems);

  return (
    <div
      className={`${
        toggleState ? 'hidden' : 'block'
      } border-1 border-rgreen w-full sm:w-[300px] max-h-[500px] absolute right-0 top-[80px] sm:top-[105px] p-5 sm:border-1 sm:border-rgreen sm:shadow-big sm:rounded-md ${
        localTheme == 'false' ? 'bg-white text-dark' : 'text-white bg-dark'
      }`}
    >
      <span className="h-full">
        {cartItems.length > 0 ? (
          <>
            <h1 className="font-bold text-lg text-rgreen">Basket</h1>
            <MiniDivider />
            <div className="overflow-y-scroll max-h-[320px]">
              {cartItems.map((item: any) => (
                <Link
                  className="flex justify-between text-xs font-bold py-1"
                  key={item.id + 1}
                  href={`/product/${item.slug}`}
                >
                  <span>{item.name}</span>
                  <span className="text-rgreen">{item.price} $</span>
                </Link>
              ))}
            </div>
            <MiniDivider />
            <div className="flex items-center justify-between w-full">
              <Link
                href={'/'}
                className="text-xxs font-bold text-rgreen border-2 border-rgreen px-5 py-2"
              >
                Go to Checkout
              </Link>
              <span className="text-rgreen text-xs font-bold">
                <div className="text-right">Total:</div>
                {sumPrice.total} $
              </span>
            </div>
          </>
        ) : (
          'Empty!'
        )}
      </span>
    </div>
  );
};

export default CartReducer;
