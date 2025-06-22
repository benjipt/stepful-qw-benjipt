import { createFileRoute, redirect } from '@tanstack/react-router';

// This route could be used in the future for a more general user profile page
// or dashboard, but currently redirects to the assignments page.

export const Route = createFileRoute('/users/$userId/')({
  loader: ({ params }) => {
    throw redirect({
      to: '/users/$userId/assignments',
      params: { userId: params.userId },
    });
  },
});
