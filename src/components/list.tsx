import Card from './card';

export default async function List({
  whichList,
  whichCategory,
  productID,
  searchQuery,
}: any) {
  //Fetch products
  const products = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    body: JSON.stringify({
      query: searchQuery
        ? `query MyQuery ($searchQuery: String) {
            products(where: { _search: $searchQuery}) {
              id
              slug
              name
              quantity
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
      `
        : whichCategory
        ? `query MyQuery($category: String) {
          category(where: {slug: $category}) {
            products {
              id
              slug
              name
              quantity
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
        }`
        : whichList == undefined
        ? ` {
    products(first:12){
      id
      slug
      name
      quantity
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
  }`
        : whichList == 'newIn'
        ? `{
    products(where: {collections_every: {slug: "new-in"}}){
      id
      slug
      name
      quantity
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
  }`
        : `{
    products(where: {collections_every: {slug: "throwback"}}){
      id
      slug
      name
      quantity
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
  }`,
      variables: {
        category: whichCategory,
        searchQuery: searchQuery,
      },
    }),
    cache: 'no-store',
  }).then((res) => res.json());

  const releatedProducts =
    whichCategory &&
    products.data.category.products.filter(function ({ id }: any) {
      return id != productID;
    });

  const data = whichCategory
    ? productID
      ? releatedProducts
      : products.data.category.products
    : products.data.products;

  return <>{data && data.map((product: any) => <Card product={product} />)}</>;
}
