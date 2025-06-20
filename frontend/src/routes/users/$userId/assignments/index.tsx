import { Link, createFileRoute } from '@tanstack/react-router';

import RenderIf from '@/components/common/render-if';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loadUserAssignments } from '@/lib/loaders';
import { cn, humanizeDuration, humanizeStatus } from '@/lib/utils';

export const Route = createFileRoute('/users/$userId/assignments/')({
  loader: async ({ params }) =>
    loadUserAssignments({ userId: parseInt(params.userId, 10) }),
  component: UserAssignments,
});

// Render helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const ASSIGNMENT_START_ROUTE = '/users/$userId/assignments/$assignmentId';
const ASSIGNMENT_SUMMARY_ROUTE =
  '/users/$userId/assignments/$assignmentId/summary';

const getAssignmentRoute = ({ status }: { status: string }): string =>
  status === 'complete' ? ASSIGNMENT_SUMMARY_ROUTE : ASSIGNMENT_START_ROUTE;
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render helpers

function UserAssignments() {
  const userAssignments = Route.useLoaderData();
  const { userId } = Route.useParams();

  return (
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center'>
        {userAssignments.map(
          ({ userAssignmentId, title, status, score, totalTimeSpent }) => (
            <Link
              to={getAssignmentRoute({ status })}
              params={{ userId, assignmentId: userAssignmentId.toString() }}
              key={userAssignmentId}
            >
              <Card key={userAssignmentId} className='hover-interactive'>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription
                    className={cn(
                      'font-medium',
                      status === 'complete' && 'text-emerald-800',
                    )}
                  >
                    {humanizeStatus(status)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RenderIf condition={!!score}>
                    <p className='text-sm'>
                      Score:{' '}
                      <span className='font-mono tracking-tight'>{score}</span>
                    </p>
                  </RenderIf>
                  <RenderIf condition={!!totalTimeSpent}>
                    <p className='text-sm'>
                      Total Time: {humanizeDuration(totalTimeSpent ?? 0)}
                    </p>
                  </RenderIf>
                </CardContent>
              </Card>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
