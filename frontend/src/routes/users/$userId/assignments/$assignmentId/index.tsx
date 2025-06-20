import { createFileRoute } from '@tanstack/react-router';

import { AssignmentQuestion, loadAssignmentQuestions } from '@/lib/loaders';
import QuestionCard from './-components/question-card';

// Helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const getNextQuestionId = (assignmentQuestions: AssignmentQuestion[]) => {
  const firstUnanswered = assignmentQuestions.find(q => !q.response);
  return firstUnanswered?.questionId;
};
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helpers

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) => {
    const assignmentQuestions = await loadAssignmentQuestions({
      userAssignmentId: params.assignmentId,
    });
    const nextQuestionId = getNextQuestionId(assignmentQuestions);
    return { assignmentQuestions, nextQuestionId };
  },
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const { assignmentQuestions: questions } = Route.useLoaderData();

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
