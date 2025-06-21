import { Link, createFileRoute, redirect } from '@tanstack/react-router';

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
  return (
    <div className='page flex flex-col items-center justify-center min-h-[60vh] px-4'>
      <Card className='max-w-xl w-full mb-8'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center text-neutral-900'>
            Assignment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-disc pl-6 space-y-2 text-neutral-800 text-base'>
            <li>
              There is <span className='font-semibold'>no time limit</span>, but
              your time will be tracked while taking the assignment.
            </li>
            <li>
              If you leave or close the page, your timer will pause and resume
              when you return.
            </li>
            <li>
              All answers are{' '}
              <span className='font-semibold'>saved automatically</span> as you
              progress. You can safely return later without losing your work.
            </li>
            <li>
              You may <span className='font-semibold'>change your answers</span>{' '}
              as many times as you like before submitting.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Button asChild size='lg' className='w-full max-w-xs'>
        <Link
          to='/users/$userId/assignments/$assignmentId/session'
          params={Route.useParams()}
        >
          Continue
        </Link>
      </Button>
    </div>
  );
}
