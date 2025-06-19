import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, loadUsers } from '@/lib/loaders';

export const Route = createFileRoute('/users/')({
  loader: () => loadUsers(),
  component: UsersIndex,
});

function UsersIndex() {
  const users = Route.useLoaderData();

  return (
    <div className='flex-1 flex flex-col p-2'>
      <div className='mt-18 flex-col gap-16'>
        <h2 className='text-center text-md font-extralight'>
          Select a User Profile to get started
        </h2>
        <div className='flex flex-col gap-4 mt-8 items-center'>
          {users.map((user: User) => (
            <Card
              key={user.id}
              className='w-sm bg-neutral-50 hover:cursor-pointer hover:translate-y-0.5 active:translate-y-1'
            >
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-neutral-500'>{user.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
