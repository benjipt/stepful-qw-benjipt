import { Link, createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, loadUsers } from '@/lib/loaders';

export const Route = createFileRoute('/users/')({
  loader: () => loadUsers(),
  component: Users,
});

function Users() {
  const users = Route.useLoaderData();

  return (
    <div className='page'>
      <div className='flex-col gap-16'>
        <h2 className='text-center text-md font-extralight'>
          Select a User Profile to get started
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-4xl mx-auto'>
          {users.map((user: User) => (
            <Link
              to='/users/$userId'
              params={{ userId: user.id.toString() }}
              key={user.id}
              className='w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto'
            >
              <Card className='hover-interactive w-full py-3 gap-1'>
                <CardHeader className='px-4 pb-2'>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent className='px-4 pt-0'>
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
