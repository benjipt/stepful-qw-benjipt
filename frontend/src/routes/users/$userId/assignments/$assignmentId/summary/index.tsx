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
  const { assignmentId, title, status, score, totalTimeSpent, results } =
    assignment;

  // results and score are always truthy on this page
  return (
    <div className='page'>
      <div className='max-w-2xl w-full sm:max-w-xl lg:max-w-3xl mx-auto mt-10 p-4 sm:p-8 bg-white rounded-lg shadow border border-neutral-200'>
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
              {humanizeDuration(totalTimeSpent ?? 0)}
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
                    <span className='text-xs text-neutral-500 mt-0'>
                      Response:
                    </span>
                    <div className='font-mono text-neutral-900 text-sm break-words min-w-0'>
                      {q.response}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs text-neutral-500'>Correct:</span>
                    <span
                      className={`font-semibold text-xs ${q.correct ? 'text-emerald-800' : 'text-rose-800'}`}
                    >
                      {q.correct ? 'Yes' : 'No'}
                    </span>
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
