import {
  CreateUserAssignmentSessionRequest,
  createUserAssignmentSession,
} from '@/lib/api/mutations';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import AssignmentMeta from '@/components/common/assignment-meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadUserAssignmentById } from '@/lib/api/loaders';
import {
  IN_PROGRESS_INSTRUCTIONS,
  NOT_YET_STARTED_INSTRUCTIONS,
} from './-constants';

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
  const params = Route.useParams();
  const navigate = useNavigate();
  const { status, totalTimeSpent, title } = assignment;
  const isInProgress = status === 'in_progress';
  const instructions = isInProgress
    ? IN_PROGRESS_INSTRUCTIONS
    : NOT_YET_STARTED_INSTRUCTIONS;

  // Mutation for creating a user assignment session
  const createSession = useMutation({
    mutationFn: (body: CreateUserAssignmentSessionRequest) =>
      createUserAssignmentSession(body),
    onSuccess: () => {
      // Navigate to the session route on success
      navigate({
        to: '/users/$userId/assignments/$assignmentId/session',
        params,
        search: { q: undefined },
      });
    },
  });

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
            {instructions.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </CardContent>
      </Card>
      <Button
        size='lg'
        className='w-full max-w-xs'
        onClick={() =>
          createSession.mutate({
            userAssignmentId: Number(params.assignmentId),
          })
        }
        disabled={createSession.isPending}
      >
        {createSession.isPending ? 'Loading...' : 'Continue'}
      </Button>
    </div>
  );
}
