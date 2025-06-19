import { Link, createFileRoute } from '@tanstack/react-router';

import RenderIf from '@/components/common/RenderIf';
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

function UserAssignments() {
  const userAssignments = Route.useLoaderData();
  const { userId } = Route.useParams();

  return (
    <div className='flex flex-col gap-4 mt-20 px-8 items-center'>
      {userAssignments.map(
        ({ assignmentId, title, status, score, totalTimeSpent }) => (
          <Link
            to='/users/$userId/assignments/$assignmentId'
            params={{ userId, assignmentId: assignmentId.toString() }}
            key={assignmentId}
          >
            <Card key={assignmentId}>
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
                    Total Time Spent: {humanizeDuration(totalTimeSpent ?? 0)}
                  </p>
                </RenderIf>
              </CardContent>
            </Card>
          </Link>
        ),
      )}
    </div>
  );
}
