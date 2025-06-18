import { createFileRoute } from '@tanstack/react-router';

import { loadUsers } from '@/lib/loaders';

export const Route = createFileRoute('/')({
  loader: () => loadUsers(),
  component: Index,
});

function Index() {
  const users = Route.useLoaderData();

  return (
    <div className='p-2'>
      {users.map(user => (
        <div key={user.id} className='p-2 border-b'>
          <h2 className='text-lg font-bold'>{user.name}</h2>
          <p className='text-sm text-gray-600'>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
