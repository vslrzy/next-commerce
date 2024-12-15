import { MiniDivider } from '@/components/divider';
import List from '@/components/list';
import { SearchModal } from '@/components/searchModals';

export default function Page({ searchParams }: any) {
  return (
    <main>
      <section>
        <div className="py-5">
          <SearchModal />
        </div>
        <MiniDivider />
        <h1 className="text-center font-semibold text-lg">
          Search results for:{' '}
          <span className="text-rgreen text-xl">
            {searchParams.query && searchParams.query}
          </span>
        </h1>
        <MiniDivider />
        <div className="grid grid-cols-6 gap-5">
          <List searchQuery={searchParams.query} />
        </div>
      </section>
    </main>
  );
}
