import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { loadAssignmentQuestions } from '@/lib/loaders';
import QuestionCard from './-components/question-card';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) => {
    const assignmentQuestions = await loadAssignmentQuestions({
      userAssignmentId: params.assignmentId,
    });
    const nextQuestionIndex = assignmentQuestions.findIndex(q => !q.response);
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
            <button className='btn' onClick={() => setCurrentIndex(i => i - 1)}>
              Previous
            </button>
          )}
          {!isLast && (
            <button className='btn' onClick={() => setCurrentIndex(i => i + 1)}>
              Next
            </button>
          )}
          {isLast && <button className='btn btn-primary'>Submit</button>}
        </div>
      </div>
    </div>
  );
}
