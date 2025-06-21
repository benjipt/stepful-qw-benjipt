import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import RenderIf from '@/components/common/render-if';
import { Button } from '@/components/ui/button';
import { loadAssignmentQuestions } from '@/lib/loaders';
import QuestionCard from './-components/question-card';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/session/',
)({
  loader: async ({ params }) => {
    const assignmentQuestions = await loadAssignmentQuestions({
      userAssignmentId: params.assignmentId,
    });
    const nextQuestionIndex = assignmentQuestions.findIndex(q => !q.response);
    // If all questions have a response, redirect to summary
    if (nextQuestionIndex === -1) {
      throw redirect({
        to: '/users/$userId/assignments/$assignmentId/summary',
        params: {
          userId: params.userId,
          assignmentId: params.assignmentId,
        },
      });
    }
    return { assignmentQuestions, nextQuestionIndex };
  },
  // validateSearch parses and validates the 'q' search param from the URL.
  // If 'q' is present, it is converted to a number; if not, it is set to undefined.
  // This ensures the search param is always in a predictable, typed format for the route/component.
  validateSearch: search => ({
    q: search.q !== undefined ? Number(search.q) : undefined,
  }),
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const { assignmentQuestions: questions, nextQuestionIndex } =
    Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Query param navigation logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
  const canSetQParam =
    q === undefined &&
    nextQuestionIndex !== undefined &&
    nextQuestionIndex !== null;

  useEffect(() => {
    if (canSetQParam) {
      navigate({
        search: prev => ({ ...prev, q: nextQuestionIndex + 1 }),
      });
    }
  }, [canSetQParam, nextQuestionIndex, navigate]);

  // Use q (1-based) as currentIndex (0-based)
  const currentIndex =
    q !== undefined ? Math.max(0, Number(q) - 1) : nextQuestionIndex;
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // Handlers to update q in the URL (pushes new history entry)
  const goToIndex = (newIndex: number) => {
    navigate({
      search: prev => ({ ...prev, q: newIndex + 1 }),
    });
  };
  // <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Query param navigation logic

  return (
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center'>
        {currentQuestion && (
          <QuestionCard
            questionId={currentQuestion.questionId}
            content={currentQuestion.content}
            choices={currentQuestion.choices}
            response={currentQuestion.response}
            points={currentQuestion.points}
          />
        )}
        <div className='flex gap-2 mt-4'>
          <RenderIf condition={!isFirst}>
            <Button onClick={() => goToIndex(currentIndex - 1)}>
              Previous
            </Button>
          </RenderIf>
          <RenderIf condition={!isLast}>
            <Button onClick={() => goToIndex(currentIndex + 1)}>Next</Button>
          </RenderIf>
          {isLast && <Button variant='default'>Submit</Button>}
        </div>
      </div>
    </div>
  );
}
