import Breadcrumbs from '@/components/breadcrumbs';
import { Divider } from '@/components/divider';
import { PageHeader } from '@/components/header';
import List from '@/components/list';

export default async function Page({ params }: any) {
  return (
    <main className="min-h-[90vh]">
      <Breadcrumbs passedCategory={params.slug} />
      <section>
        <PageHeader passed={params.slug} />
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-5">
          <List whichCategory={params.slug} />
        </div>
        <Divider />
      </section>
    </main>
  );
}
