import { createFileRoute } from '@tanstack/react-router';

import { loadUsers } from '@/lib/loaders';

export const Route = createFileRoute('/')({
  loader: () => loadUsers(),
  component: Index,
});

function Index() {
  // const users = Route.useLoaderData();

  return <div className='flex-1 flex flex-col p-2'></div>;
}
