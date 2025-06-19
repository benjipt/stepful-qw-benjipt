import { createFileRoute } from '@tanstack/react-router';

import RenderIf from '@/components/common/RenderIf';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loadUserAssignments } from '@/lib/loaders';
import { humanizeStatus } from '@/lib/utils';

export const Route = createFileRoute('/users/$userId/assignments/')({
  loader: async ({ params }) =>
    loadUserAssignments({ userId: parseInt(params.userId, 10) }),
  component: UserAssignments,
});

function UserAssignments() {
  const userAssignments = Route.useLoaderData();

  return (
    <div className='flex flex-col gap-4 mt-20 px-8 justify-center'>
      {userAssignments.map(({ assignmentId, title, status, score }) => (
        <Card key={assignmentId}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{humanizeStatus(status)}</CardDescription>
          </CardHeader>
          <CardContent>
            <RenderIf condition={!!score}>
              <p>Score: {score}</p>
            </RenderIf>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
