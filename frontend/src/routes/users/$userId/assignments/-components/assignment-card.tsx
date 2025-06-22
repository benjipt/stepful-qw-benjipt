import RenderIf from '@/components/common/render-if';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn, humanizeDuration, humanizeStatus } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

interface Props {
  userAssignmentId: number;
  title: string;
  status: string;
  score?: number;
  totalTimeSpent?: number;
  userId: string;
  route: string;
}

const AssignmentCard: React.FC<Props> = ({
  userAssignmentId,
  title,
  status,
  score,
  totalTimeSpent,
  userId,
  route,
}) => {
  // Render helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
  const canRenderStatus =
    status === 'not_yet_started' || status === 'in_progress';
  const inProgress = status === 'in_progress';
  // <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render helpers

  return (
    <Link
      to={route}
      params={{ userId, assignmentId: userAssignmentId.toString() }}
      key={userAssignmentId}
      className='w-full max-w-sm lg:max-w-md mx-auto'
    >
      <Card className='hover-interactive w-full'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <RenderIf condition={canRenderStatus}>
            <CardDescription
              className={cn(
                'font-semibold',
                inProgress ? 'text-amber-700' : 'text-sky-800',
              )}
            >
              {humanizeStatus(status)}
              {inProgress && ': Paused'}
            </CardDescription>
          </RenderIf>
        </CardHeader>
        <CardContent>
          <RenderIf condition={!!score}>
            <p className='text-sm'>
              Score: <span className='font-mono tracking-tight'>{score}</span>
            </p>
          </RenderIf>
          <RenderIf condition={!!totalTimeSpent}>
            <p className='text-sm'>
              Total Time: {humanizeDuration(totalTimeSpent ?? 0)}
            </p>
          </RenderIf>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AssignmentCard;
