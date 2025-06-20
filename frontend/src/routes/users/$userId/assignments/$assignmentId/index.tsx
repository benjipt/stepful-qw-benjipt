import { createFileRoute } from '@tanstack/react-router';

import { loadAssignmentQuestions } from '@/lib/loaders';
import QuestionCard from './-components/question-card';

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
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center'>
        {questions?.map(
          ({ questionId, content, choices, response, points }) => (
            <QuestionCard
              questionId={questionId}
              content={content}
              choices={choices}
              response={response}
              points={points}
            />
          ),
        )}
      </div>
    </div>
  );
}
