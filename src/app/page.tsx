import BannerSlider, { CategoriesSlider } from '@/components/sliders';
import { Divider } from '@/components/divider';
import List from '@/components/list';
import { ListHeader } from '@/components/typography';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <BannerSlider />
      <Divider />
      <section className="grid sm:grid-cols-2 gap-2 sm:gap-5">
        <div>
          <ListHeader passed={'New In'} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5">
            <List whichList={'newIn'} />
          </div>
        </div>
        <div>
          <ListHeader passed={'Throwback'} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5">
            <List whichList={'throwback'} />
          </div>
        </div>
      </section>
      <section>
        <ListHeader passed={'Products'} center={true} />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-5">
        <List />
      </section>
      <section className="text-center">
        <Divider />
        <Link
          href={'/products'}
          className="bg-rgreen text-white px-5 py-2 text-sm font-medium rounded-md"
        >
          All products
        </Link>
      </section>
      <section>
        <Divider />
        <h1 className="text-xl text-rgreen font-bold text-center">
          Categories
        </h1>
        <Divider />
        <CategoriesSlider />
        <Divider />
      </section>
    </main>
  );
}
