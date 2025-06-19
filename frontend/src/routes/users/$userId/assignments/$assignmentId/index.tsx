import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/users/$userId/assignments/$assignmentId/"!</div>;
}
