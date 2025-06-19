import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadAssignmentQuestions } from '@/lib/loaders';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) =>
    loadAssignmentQuestions({ userAssignmentId: params.assignmentId }),
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const questions = Route.useLoaderData();
  return (
    <div className='flex flex-col gap-4 mt-20 px-8 items-center'>
      {questions?.map(question => (
        <Card key={question.questionId} className='w-md'>
          <CardHeader>
            <CardTitle className='leading-7'>{question.content}</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(question.choices) && question.choices.length > 0 && (
              <ul className='list-disc pl-6 space-y-1'>
                {question.choices.map((choice, idx) => (
                  <li key={idx}>{choice}</li>
                ))}
              </ul>
            )}
            {/* Render more question details here if needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
