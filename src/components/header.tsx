export const PageHeader = async ({ passed, text }: any) => {
  //Fetch function
  const response =
    !text &&
    (await fetch(process.env.NEXT_PUBLIC_API as string, {
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
          category: passed,
        },
      }),
    }).then((res) => res.json()));

  const data = !text && response.data.category.name;
  return (
    <h1 className="text-sm sm:text-xl font-bold py-10 uppercase">
      {text ? text : data}
    </h1>
  );
};
