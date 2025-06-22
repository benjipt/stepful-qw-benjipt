import { createFileRoute } from '@tanstack/react-router';

import RenderIf from '@/components/common/render-if';
import { UserAssignment, loadUserAssignments } from '@/lib/loaders';
import AssignmentCard from './-components/assignment-card';

interface SeperatedAssignments {
  complete: UserAssignment[];
  available: UserAssignment[];
}

// Utility to separate assignments by status
// O(n) for both time and space complexity
const separateAssignments = (
  assignments: UserAssignment[],
): SeperatedAssignments => {
  const complete: UserAssignment[] = [];
  const available: UserAssignment[] = [];
  for (const assignment of assignments) {
    if (assignment.status === 'complete') {
      complete.push(assignment);
    } else if (assignment.status === 'in_progress') {
      available.unshift(assignment); // Prepend in_progress assignments
    } else {
      available.push(assignment); // Append all other available assignments
    }
  }
  return { complete, available };
};

export const Route = createFileRoute('/users/$userId/assignments/')({
  loader: async ({ params }) => {
    const assignments = await loadUserAssignments({
      userId: parseInt(params.userId, 10),
    });
    return separateAssignments(assignments);
  },
  component: UserAssignments,
});

// Render helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const ASSIGNMENT_START_ROUTE = '/users/$userId/assignments/$assignmentId';
const ASSIGNMENT_SUMMARY_ROUTE =
  '/users/$userId/assignments/$assignmentId/summary';
const SECTION_HEADING_CLASS = 'text-lg font-regular mb-2';

const getAssignmentRoute = (status: string): string =>
  status === 'complete' ? ASSIGNMENT_SUMMARY_ROUTE : ASSIGNMENT_START_ROUTE;
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render helpers

function UserAssignments() {
  const { complete, available } = Route.useLoaderData();
  const { userId } = Route.useParams();

  return (
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center w-full'>
        <RenderIf condition={available.length > 0}>
          <h2 className={SECTION_HEADING_CLASS}>Available</h2>
          {available.map(
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
        </RenderIf>
        <RenderIf condition={complete.length > 0}>
          <h2 className={SECTION_HEADING_CLASS + ' mt-8'}>Completed</h2>
          {complete.map(
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
        </RenderIf>
      </div>
    </div>
  );
}
