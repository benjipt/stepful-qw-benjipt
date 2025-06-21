import { humanizeDuration, humanizeStatus } from '@/lib/utils';
import React from 'react';
import RenderIf from './render-if';

interface AssignmentMetaProps {
  title?: string;
  status?: string;
  score?: number;
  timeDuration?: number;
  className?: string;
}

const AssignmentMeta: React.FC<AssignmentMetaProps> = ({
  title,
  status,
  score,
  timeDuration,
  className = '',
}) => {
  const isComplete = typeof score === 'number';
  const timeDurationLabel = isComplete
    ? 'Total Time Spent:'
    : 'Time in Progress:';

  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
      <RenderIf condition={!!title}>
        <div className='text-lg font-bold text-neutral-900 mb-1'>{title}</div>
      </RenderIf>
      <dl className='flex flex-col gap-1'>
        <RenderIf condition={!!status}>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Status:</dt>
            <dd className='font-semibold text-emerald-700'>
              {humanizeStatus(status!)}
            </dd>
          </div>
        </RenderIf>
        <RenderIf condition={!!score}>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Score:</dt>
            <dd className='font-semibold text-neutral-900'>{score}</dd>
          </div>
        </RenderIf>
        <RenderIf condition={!!timeDuration}>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>{timeDurationLabel}</dt>
            <dd className='font-mono text-neutral-800'>
              {humanizeDuration(timeDuration!)}
            </dd>
          </div>
        </RenderIf>
      </dl>
    </div>
  );
};

export default AssignmentMeta;
