import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadUserAssignmentById } from '@/lib/loaders';
import { humanizeDuration } from '@/lib/utils';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/summary/',
)({
  loader: async ({ params }) =>
    loadUserAssignmentById({ id: parseInt(params.assignmentId, 10) }),
  component: RouteComponent,
});

function RouteComponent() {
  const assignment = Route.useLoaderData();
  const { title, score, totalTimeSpent, results } = assignment;

  // results and score are always truthy on this page
  return (
    <div className='page'>
      <div className='max-w-2xl w-full sm:max-w-xl lg:max-w-3xl mx-auto mt-10 p-4 sm:p-8 bg-white rounded-lg shadow border border-neutral-200'>
        <h1 className='text-2xl font-bold mb-2 text-neutral-900'>{title}</h1>
        <dl className='mb-4 flex flex-col gap-1'>
          <div className='flex text-sm text-neutral-500'></div>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Score:</dt>
            <dd className='font-semibold text-neutral-900'>{score}</dd>
          </div>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Total Time Spent:</dt>
            <dd className='font-mono text-neutral-800'>
              {humanizeDuration(totalTimeSpent ?? 0)}
            </dd>
          </div>
        </dl>
        <div className='mt-6'>
          <h2 className='text-lg font-semibold mb-2 text-neutral-800'>
            Results
          </h2>
          <div className='mb-2 text-sm text-neutral-700 flex flex-wrap gap-x-8 gap-y-1'>
            <div>
              <span className='mr-1'>Total Questions:</span>
              <span className='font-mono text-neutral-900'>
                {results!.totalQuestions}
              </span>
            </div>
            <div>
              <span className='mr-1'>Total Correct:</span>
              <span className='font-mono text-neutral-900'>
                {results!.totalCorrect}
              </span>
            </div>
          </div>
          <div className='grid gap-4 w-full'>
            {results!.questions.map((q, idx) => (
              <Card key={q.id} className='relative w-full'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <span className='inline-block rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold'>
                      Q{idx + 1}
                    </span>
                    <span>{q.content}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-2 pt-0'>
                  <div className='grid grid-cols-[auto,1fr] items-start gap-y-1 w-full'>
                    <dt className='text-xs text-neutral-500 mt-0'>Response:</dt>
                    <dd className='font-mono text-neutral-900 text-sm break-words min-w-0'>
                      {q.response}
                    </dd>
                  </div>
                  <div className='flex items-center gap-2'>
                    <dt className='text-xs text-neutral-500'>Correct:</dt>
                    <dd
                      className={`font-semibold text-xs ${q.correct ? 'text-emerald-800' : 'text-rose-800'}`}
                    >
                      {q.correct ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  {q.correct && (
                    <span className='absolute bottom-4 right-6 text-emerald-800 font-bold text-lg'>
                      + {q.points}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
