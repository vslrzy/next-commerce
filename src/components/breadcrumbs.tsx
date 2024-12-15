import Link from 'next/link';

export default async function Breadcrumbs({
  passedCategory,
  passedProduct,
}: any) {
  //Fetch function
  const response = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    body: JSON.stringify({
      query: `query MyQuery($category: String) {
                category(where: {slug: $category}) {
                    name
                  products {
                    id
                    slug
                    name
                    images{
                      id
                      url
                    }
                    categories{
                      id
                      slug
                      name
                    }
                    price
                  }
                }
              }`,
      variables: {
        category: passedCategory,
      },
    }),
  }).then((res) => res.json());

  const data = passedCategory && response.data.category.name;

  return (
    <div className="border-b-1 border-rgreen py-3 text-xs font-bold">
      <section>
        {passedProduct ? (
          <>
            <Link href={'/'}>Home</Link>
            {' / '}
            <Link href={`/category/${passedProduct.categories['0'].slug}`}>
              {passedProduct.categories['0'].name}
            </Link>
            {' / '}
            <span>{passedProduct.name}</span>
          </>
        ) : (
          <>
            <Link href={'/'}>Home</Link>
            {' / '}
            <span>{data}</span>
          </>
        )}
      </section>
    </div>
  );
}
