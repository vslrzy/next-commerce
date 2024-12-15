'use client';

export const ProductColorVariant = ({ colorVariant }: any) => {
  return (
    <span
      style={{ borderColor: colorVariant.toLowerCase() }}
      className="w-[25px] h-[25px] inline-block border-2 rounded-md p-[2px]"
    >
      <span
        style={{ background: colorVariant.toLowerCase() }}
        className="inline-block w-full h-full rounded-sm"
      ></span>
    </span>
  );
};

export const ProductSizeVariant = ({ sizeVariant }: any) => {
  return <span className="underline text-sm">{sizeVariant}</span>;
};
