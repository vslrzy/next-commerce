import Navbar from '@/components/navigation';
import './globals.css';
import type { Metadata } from 'next';
import Wrapper from '@/libs/base';
import { Montserrat } from 'next/font/google';
import Footer from '@/components/footer';

//Font
const font = Montserrat({
  subsets: ['latin'],
});

//Metadata
export const metadata: Metadata = {
  title: 'Commerce Shop - Homepage',
};

//Fetch function for passing to Context
async function GetData() {
  //Logo data
  const logo_response = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    body: JSON.stringify({
      query: `
        {
          logos{
            id
            logoImage{
              id
              url
            }
          }
        }
      `,
    }),
  }).then((res) => res.json());
  const logo = logo_response.data.logos;

  //Banner data for Banner Slider
  const banner_response = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    body: JSON.stringify({
      query: `
        {
          banners{
            bannerImage{
              id
              url
            }
          }
        }
      `,
    }),
  }).then((res) => res.json());
  const banners = banner_response.data.banners;

  //Categories data
  const categories_response = await fetch(
    process.env.NEXT_PUBLIC_API as string,
    {
      method: 'POST',
      body: JSON.stringify({
        query: `
        {
          categories{
            id
            name
            slug
            categoryImage{
              id
              url
            }
          }
        }
      `,
      }),
      cache: 'no-store',
    }
  ).then((res) => res.json());
  const categories = categories_response.data.categories;

  return { logo, banners, categories };
}

//Layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Data for passing to context
  const data = await GetData();

  return (
    <Wrapper passed={data}>
      <body className={font.className}>
        <Navbar />
        <div className="mt-[80px]">{children}</div>
        <Footer />
      </body>
    </Wrapper>
  );
}
