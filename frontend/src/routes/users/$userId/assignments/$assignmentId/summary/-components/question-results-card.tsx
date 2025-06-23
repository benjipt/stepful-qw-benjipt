import RenderIf from '@/components/common/render-if';
import {
  Card,
  CardContent,
  CardContentQPoints,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  idx: number;
  content: string;
  response: string;
  correct: boolean;
  points: number;
  gradeExplanation?: string;
}

const QuestionResultsCard: React.FC<Props> = ({
  idx,
  content,
  response,
  correct,
  points,
  gradeExplanation,
}) => {
  return (
    <Card className='relative w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='flex items-center gap-2 text-base'>
          <span className='inline-block rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-sm font-bold'>
            Q{idx + 1}
          </span>
          <span>{content}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 pt-0'>
        <div className='grid grid-cols-[auto,1fr] items-start gap-y-1 w-full'>
          <dt className='text-sm text-neutral-500 mt-0'>Response:</dt>
          <dd className='font-mono text-neutral-900 text-sm break-words min-w-0'>
            {response}
          </dd>
        </div>
        <div className='flex items-center gap-2'>
          <dt className='text-sm text-neutral-500'>Correct:</dt>
          <dd
            className={`font-semibold text-sm ${correct ? 'text-emerald-800' : 'text-rose-800'}`}
          >
            {correct ? 'Yes' : 'No'}
          </dd>
        </div>
        <RenderIf condition={!!gradeExplanation}>
          <div className='grid grid-cols-[auto,1fr] items-start gap-y-1 w-full'>
            <dt className='text-sm text-neutral-500'>Explanation:</dt>
            <dd className='text-neutral-900 text-sm break-words min-w-0'>
              {gradeExplanation}
            </dd>
          </div>
        </RenderIf>
        <RenderIf condition={correct}>
          <CardContentQPoints points={points} />
        </RenderIf>
      </CardContent>
    </Card>
  );
};

export default QuestionResultsCard;
