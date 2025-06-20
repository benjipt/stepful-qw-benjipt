import { createFileRoute } from '@tanstack/react-router';

import { loadUserAssignmentById } from '@/lib/loaders';
import AssignmentMeta from './-components/assignment-meta';
import QuestionResultsCard from './-components/question-results-card';
import ResultsSummary from './-components/results-summary';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/summary/',
)({
  loader: async ({ params }) =>
    loadUserAssignmentById({ id: parseInt(params.assignmentId, 10) }),
  component: UserAssignmentSummary,
});

function UserAssignmentSummary() {
  const assignment = Route.useLoaderData();
  const { title, score, totalTimeSpent, results } = assignment;

  // Results and score should always be truthy on this page.
  return (
    <div className='page'>
      <div className='max-w-2xl w-full sm:max-w-xl lg:max-w-3xl mx-auto mt-10 p-4 sm:p-8 bg-white rounded-lg shadow border border-neutral-200'>
        <h1 className='text-2xl font-bold mb-2 text-neutral-900'>{title}</h1>
        <AssignmentMeta
          score={score ?? 0}
          totalTimeSpent={totalTimeSpent ?? 0}
        />
        <div className='mt-6'>
          <h2 className='text-lg font-semibold mb-2 text-neutral-800'>
            Results
          </h2>
          <ResultsSummary
            totalQuestions={results!.totalQuestions}
            totalCorrect={results!.totalCorrect}
          />
          <div className='grid gap-4 w-full'>
            {results!.questions.map((q, idx) => (
              <QuestionResultsCard
                key={q.id}
                idx={idx}
                content={q.content}
                response={q.response}
                correct={q.correct}
                points={q.points}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
