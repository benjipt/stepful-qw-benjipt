import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';

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
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const { assignmentQuestions: questions, nextQuestionIndex } =
    Route.useLoaderData();

  const [currentIndex, setCurrentIndex] = useState(
    nextQuestionIndex >= 0 ? nextQuestionIndex : 0,
  );
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

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
          {!isFirst && (
            <Button onClick={() => setCurrentIndex(i => i - 1)}>
              Previous
            </Button>
          )}
          {!isLast && (
            <Button onClick={() => setCurrentIndex(i => i + 1)}>Next</Button>
          )}
          {isLast && <Button variant='default'>Submit</Button>}
        </div>
      </div>
    </div>
  );
}
