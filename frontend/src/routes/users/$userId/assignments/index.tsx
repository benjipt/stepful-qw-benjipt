import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserAssignment, loadUserAssignments } from '@/lib/loaders';
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
      {userAssignments.map((assignment: UserAssignment) => (
        <Card key={assignment.assignmentId}>
          <CardHeader>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>
              {humanizeStatus(assignment.status)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assignment.score !== undefined && assignment.score !== null && (
              <div>Score: {assignment.score}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
