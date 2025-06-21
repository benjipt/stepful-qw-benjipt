import { Link, createFileRoute, redirect } from '@tanstack/react-router';

import AssignmentMeta from '@/components/common/assignment-meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadUserAssignmentById } from '@/lib/loaders';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) => {
    const assignment = await loadUserAssignmentById({
      id: parseInt(params.assignmentId, 10),
    });
    if (assignment.status === 'complete') {
      throw redirect({
        to: '/users/$userId/assignments/$assignmentId/summary',
        params: {
          userId: params.userId,
          assignmentId: params.assignmentId,
        },
      });
    }
    return assignment;
  },
  component: Assignment,
});

function Assignment() {
  const assignment = Route.useLoaderData();
  const { status, totalTimeSpent, title } = assignment;
  const isInProgress = status === 'in_progress';

  return (
    <div className='page flex flex-col items-center justify-center min-h-[60vh] px-4'>
      <Card className='max-w-xl w-full mb-8'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center text-neutral-900'>
            Assignment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AssignmentMeta
            title={title}
            status={status}
            // The BE ensures totalTimeSpent is defined for in-progress assignments
            timeDuration={isInProgress ? totalTimeSpent! : undefined}
            className='mb-6 items-start'
          />
          <ul className='list-disc pl-6 space-y-2 text-neutral-800 text-base'>
            {isInProgress ? (
              <>
                <li>Your assignment is currently in progress.</li>
                <li>
                  You can continue where you left off. All your answers are
                  saved automatically.
                </li>
                <li>
                  You may change your answers as many times as you like before
                  submitting.
                </li>
                <li>
                  If you leave or close the page, your timer will pause and
                  resume when you return.
                </li>
              </>
            ) : (
              <>
                <li>
                  There is <span className='font-semibold'>no time limit</span>,
                  but your time will be tracked while taking the assignment.
                </li>
                <li>
                  If you leave or close the page, your timer will pause and
                  resume when you return.
                </li>
                <li>
                  All answers are{' '}
                  <span className='font-semibold'>saved automatically</span> as
                  you progress. You can safely return later without losing your
                  work.
                </li>
                <li>
                  You may{' '}
                  <span className='font-semibold'>change your answers</span> as
                  many times as you like before submitting.
                </li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
      <Button asChild size='lg' className='w-full max-w-xs'>
        <Link
          to='/users/$userId/assignments/$assignmentId/session'
          params={Route.useParams()}
          search={{ q: undefined }} // Type-safe: no ?q in URL, satisfies router
        >
          Continue
        </Link>
      </Button>
    </div>
  );
}
