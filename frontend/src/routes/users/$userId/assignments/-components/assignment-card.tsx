import { Link } from '@tanstack/react-router';

import AssignmentMeta from '@/components/common/assignment-meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  // Only render status if it's not 'complete' on the page where this component is currently used.
  const canRenderStatus = status !== 'complete';

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
        </CardHeader>
        <CardContent>
          <AssignmentMeta
            title={undefined}
            status={canRenderStatus ? status : undefined}
            score={score}
            timeDuration={totalTimeSpent}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default AssignmentCard;
