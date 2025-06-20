import { Link, createFileRoute } from '@tanstack/react-router';

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
      <div className='flex-col gap-16'>
        <h2 className='text-center text-md font-extralight'>
          Select a User Profile to get started
        </h2>
        <div className='flex flex-col gap-4 mt-8 items-center'>
          {users.map((user: User) => (
            <Link
              to='/users/$userId'
              params={{ userId: user.id.toString() }}
              key={user.id}
            >
              <Card className='card-interactive'>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-neutral-500'>{user.email}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
