import React from 'react';

import RenderIf from '@/components/common/render-if';
import { cn, humanizeDuration, humanizeStatus } from '@/lib/utils';

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
  // Render helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
  const statusColorMap: Record<string, string> = {
    complete: 'text-emerald-700',
    in_progress: 'text-amber-700',
  };

  const getTimeDurationLabel = (status?: string) =>
    status === 'complete' ? 'Total Time Spent:' : 'Time in Progress:';
  // <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render helpers

  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
      <RenderIf condition={!!title}>
        <div className='text-lg font-bold text-neutral-900 mb-1'>{title}</div>
      </RenderIf>
      <dl className='flex flex-col gap-1'>
        <RenderIf condition={!!status}>
          <div className='flex text-sm text-neutral-500'>
            <dt className='mr-1'>Status:</dt>
            <dd
              className={cn(
                'font-semibold',
                statusColorMap[status ?? ''] || 'text-black',
              )}
            >
              {humanizeStatus(status ?? '')}
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
            <dt className='mr-1'>{getTimeDurationLabel(status)}</dt>
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
