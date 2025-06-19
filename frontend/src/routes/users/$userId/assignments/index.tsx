import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loadUserAssignments } from '@/lib/loaders';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId/assignments/')({
  loader: async ({ params }) =>
    loadUserAssignments({ userId: parseInt(params.userId, 10) }),
  component: UserAssignments,
});

function UserAssignments() {
  const userAssignments = Route.useLoaderData();

  return (
    <div className='flex flex-col gap-4 mt-20 px-8 justify-center'>
      {userAssignments.map((assignment: any) => (
        <Card key={assignment.assignmentId}>
          <CardHeader>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>Status: {assignment.status}</CardDescription>
          </CardHeader>
          <CardContent>
            {assignment.startedAt && (
              <div>
                Started: {new Date(assignment.startedAt).toLocaleString()}
              </div>
            )}
            {assignment.completedAt && (
              <div>
                Completed: {new Date(assignment.completedAt).toLocaleString()}
              </div>
            )}
            {assignment.score !== undefined && assignment.score !== null && (
              <div>Score: {assignment.score}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
