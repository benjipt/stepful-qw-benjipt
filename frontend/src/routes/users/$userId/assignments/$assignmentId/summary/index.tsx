import { createFileRoute } from '@tanstack/react-router';

import { loadUserAssignmentById } from '@/lib/loaders';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/summary/',
)({
  loader: async ({ params }) =>
    loadUserAssignmentById({ id: parseInt(params.assignmentId, 10) }),
  component: RouteComponent,
});

function RouteComponent() {
  const assignment = Route.useLoaderData();
  const { assignmentId, title, status, score, totalTimeSpent, results } =
    assignment;

  // results and score are always truthy on this page
  return (
    <div className='page'>
      <div className='max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow border border-neutral-200'>
        <h1 className='text-2xl font-bold mb-2 text-neutral-900'>{title}</h1>
        <div className='mb-4 flex flex-col gap-1'>
          <span className='text-sm text-neutral-500'>
            Assignment ID:{' '}
            <span className='font-mono text-neutral-800'>{assignmentId}</span>
          </span>
          <span className='text-sm text-neutral-500'>
            Status:{' '}
            <span className='font-semibold text-neutral-800 capitalize'>
              {status}
            </span>
          </span>
          <span className='text-sm text-neutral-500'>
            Score:{' '}
            <span className='font-semibold text-neutral-900'>{score}</span>
          </span>
          <span className='text-sm text-neutral-500'>
            Total Time Spent:{' '}
            <span className='font-mono text-neutral-800'>
              {totalTimeSpent} seconds
            </span>
          </span>
        </div>
        <div className='mt-6'>
          <h2 className='text-lg font-semibold mb-2 text-neutral-800'>
            Results
          </h2>
          <div className='mb-2 text-sm text-neutral-700'>
            <span>
              Total Questions:{' '}
              <span className='font-mono text-neutral-900'>
                {results!.totalQuestions}
              </span>
            </span>
            <span className='ml-4'>
              Total Correct:{' '}
              <span className='font-mono text-neutral-900'>
                {results!.totalCorrect}
              </span>
            </span>
          </div>
          <div className='divide-y divide-neutral-200 border border-neutral-100 rounded-md overflow-hidden'>
            {results!.questions.map(q => (
              <div key={q.id} className='p-4 flex flex-col gap-1 bg-neutral-50'>
                <div className='font-medium text-neutral-900'>
                  Q: {q.content}
                </div>
                <div className='text-sm text-neutral-700'>
                  Response:{' '}
                  <span className='font-mono text-neutral-900'>
                    {q.response}
                  </span>
                </div>
                <div className='text-xs text-neutral-500'>
                  Correct:{' '}
                  <span
                    className={`font-semibold ${q.correct ? 'text-emerald-800' : 'text-rose-800'}`}
                  >
                    {q.correct ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
