import { loadAssignmentQuestions } from '@/lib/loaders';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) =>
    loadAssignmentQuestions({ assignmentId: params.assignmentId }),
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const questions = Route.useLoaderData();
  return <div>{JSON.stringify(questions)}</div>;
}
