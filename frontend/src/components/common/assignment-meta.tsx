import { humanizeDuration, humanizeStatus } from '@/lib/utils';
import React from 'react';

interface AssignmentMetaProps {
  title?: string;
  status?: string;
  score?: number;
  totalTimeSpent?: number;
  timeInProgress?: number;
  className?: string;
}

const AssignmentMeta: React.FC<AssignmentMetaProps> = ({
  title,
  status,
  score,
  totalTimeSpent,
  timeInProgress,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
      {title && (
        <div className='text-lg font-bold text-neutral-900 mb-1'>{title}</div>
      )}
      <dl className='flex flex-col gap-1'>
        {status && (
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Status:</dt>
            <dd className='font-semibold text-emerald-700'>
              {humanizeStatus(status)}
            </dd>
          </div>
        )}
        {typeof score === 'number' && (
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Score:</dt>
            <dd className='font-semibold text-neutral-900'>{score}</dd>
          </div>
        )}
        {typeof totalTimeSpent === 'number' && (
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Total Time Spent:</dt>
            <dd className='font-mono text-neutral-800'>
              {humanizeDuration(totalTimeSpent)}
            </dd>
          </div>
        )}
        {typeof timeInProgress === 'number' && (
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Time in Progress:</dt>
            <dd className='font-mono text-neutral-800'>
              {humanizeDuration(timeInProgress)}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default AssignmentMeta;
