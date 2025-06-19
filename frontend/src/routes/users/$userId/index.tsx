import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId/')({
  loader: () => {
    throw redirect({
      to: '/users/$userId/assignments',
      params: { userId: Route.useParams().userId },
    });
  },
});
