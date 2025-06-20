import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  idx: number;
  content: string;
  response: string;
  correct: boolean;
  points: number;
}

const QuestionResultsCard: React.FC<Props> = ({
  idx,
  content,
  response,
  correct,
  points,
}) => {
  return (
    <Card className='relative w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='flex items-center gap-2 text-base'>
          <span className='inline-block rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold'>
            Q{idx + 1}
          </span>
          <span>{content}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 pt-0'>
        <div className='grid grid-cols-[auto,1fr] items-start gap-y-1 w-full'>
          <dt className='text-xs text-neutral-500 mt-0'>Response:</dt>
          <dd className='font-mono text-neutral-900 text-sm break-words min-w-0'>
            {response}
          </dd>
        </div>
        <div className='flex items-center gap-2'>
          <dt className='text-xs text-neutral-500'>Correct:</dt>
          <dd
            className={`font-semibold text-xs ${correct ? 'text-emerald-800' : 'text-rose-800'}`}
          >
            {correct ? 'Yes' : 'No'}
          </dd>
        </div>
        {correct && (
          <span className='absolute bottom-4 right-6 text-emerald-800 font-bold text-lg'>
            + {points}
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionResultsCard;
