import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId/')({
  loader: ({ params }) => {
    throw redirect({
      to: '/users/$userId/assignments',
      params: { userId: params.userId },
    });
  },
});
