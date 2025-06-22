import { createFileRoute } from '@tanstack/react-router';

import { loadUserAssignments } from '@/lib/loaders';
import AssignmentCard from './-components/assignment-card';

export const Route = createFileRoute('/users/$userId/assignments/')({
  loader: async ({ params }) =>
    loadUserAssignments({ userId: parseInt(params.userId, 10) }),
  component: UserAssignments,
});

// Render helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const ASSIGNMENT_START_ROUTE = '/users/$userId/assignments/$assignmentId';
const ASSIGNMENT_SUMMARY_ROUTE =
  '/users/$userId/assignments/$assignmentId/summary';

const getAssignmentRoute = (status: string): string =>
  status === 'complete' ? ASSIGNMENT_SUMMARY_ROUTE : ASSIGNMENT_START_ROUTE;
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render helpers

function UserAssignments() {
  const userAssignments = Route.useLoaderData();
  const { userId } = Route.useParams();

  return (
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center w-full'>
        {userAssignments.map(
          ({ userAssignmentId, title, status, score, totalTimeSpent }) => (
            <AssignmentCard
              key={userAssignmentId}
              userAssignmentId={userAssignmentId}
              title={title}
              status={status}
              score={score ?? undefined}
              totalTimeSpent={totalTimeSpent ?? undefined}
              userId={userId}
              route={getAssignmentRoute(status)}
            />
          ),
        )}
      </div>
    </div>
  );
}
