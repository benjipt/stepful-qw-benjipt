import { humanizeDuration } from '@/lib/utils';

interface Props {
  score: number;
  totalTimeSpent: number;
}

const AssignmentMeta: React.FC<Props> = ({ score, totalTimeSpent }) => {
  return (
    <dl className='mb-4 flex flex-col gap-1'>
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
  );
};

export default AssignmentMeta;
