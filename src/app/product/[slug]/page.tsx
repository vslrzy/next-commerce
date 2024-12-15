import Breadcrumbs from '@/components/breadcrumbs';
import { Divider, MiniDivider } from '@/components/divider';
import List from '@/components/list';
import { ImageSlider } from '@/components/sliders';
import { ListHeader } from '@/components/typography';
import { ProductColorVariant, ProductSizeVariant } from '@/components/variants';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function Page({ params }: any) {
  //Fetch single product
  const response = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    body: JSON.stringify({
      query: `   
        query Product ($slug: String){
            product(where: { slug: $slug }){
            id
            name
            slug
            description
            price
            categories{
              id
              slug
              name
            }
            images{
              id
              url
            }
            productColorVariants {
              color
              id
              name
            }
            productSizeVariants {
              id
              size
              name
            }
            }  
        }
    `,
      variables: {
        slug: params.slug,
      },
    }),
    cache: 'no-store',
  }).then((res) => res.json());

  const product = response.data.product;

  return (
    <main>
      <Breadcrumbs passedProduct={product} />
      <section className="py-5">
        <h1 className={`text-xl font-bold text-rgreen`}>{product.name}</h1>
        <Divider />
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="w-full">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-full py-5 sm:py-0 sm:px-10">
            <h1 className="text-lg font-bold border-b-1">Description</h1>
            <MiniDivider />
            <div className="text-xs font-bold">
              {product.description
                ? product.description.length > 5
                  ? product.description
                  : 'No description'
                : 'No description'}
            </div>
            <MiniDivider />
            <div className="flex justify-start gap-2 items-end pb-7">
              <span className="text-xs font-bold">Category:</span>
              {product.categories &&
                product.categories.map((category: any) => (
                  <Link
                    className="text-sm font-bold text-rgreen"
                    href={`/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                ))}
            </div>

            {product.productColorVariants.length > 0 && (
              <div>
                <h1 className="text-xs font-bold pb-2">Color variants:</h1>
                <div className="flex justify-start items-center gap-1">
                  {product.productColorVariants.map((color: any) => (
                    <ProductColorVariant colorVariant={color.color} />
                  ))}
                </div>
              </div>
            )}

            {product.productSizeVariants.length > 0 && (
              <div className="font-bold">
                <MiniDivider />
                <h1 className="text-xs font-bold pb-2">Size variants:</h1>
                <div className="flex justify-start items-center gap-1">
                  {product.productSizeVariants.map((size: any) => (
                    <ProductSizeVariant sizeVariant={size.size} />
                  ))}
                </div>
                <MiniDivider />
              </div>
            )}

            <div className="text-xs font-bold">
              Price:{' '}
              <span className="inline-block border-2 border-rgreen rounded-sm p-[2px] text-sm text-white mx-2 font-medium">
                <span className="inline-block bg-rgreen px-3 py-1 rounded-sm">
                  {product.price} $
                </span>
              </span>
            </div>
            <MiniDivider />
            <span className="text-sm font-medium text-white bg-rgreen inline-block px-6 py-2 rounded-md">
              Add to cart
            </span>
          </div>
        </div>

        <Divider />
        <ListHeader passed={'Releated products'} center={true} />
        {/*Releated products*/}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-5">
          <List
            whichCategory={product.categories['0'].slug}
            productID={product.id}
          />
        </div>
        {/*Releated products*/}
      </section>
    </main>
  );
}
