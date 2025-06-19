import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { loadAssignmentQuestions } from '@/lib/loaders';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/',
)({
  loader: async ({ params }) =>
    loadAssignmentQuestions({ userAssignmentId: params.assignmentId }),
  component: AssignmentQuestions,
});

function AssignmentQuestions() {
  const questions = Route.useLoaderData();
  return (
    <div className='flex flex-col gap-4 px-8 items-center'>
      {questions?.map(question => (
        <Card key={question.questionId} className='w-md'>
          <CardHeader>
            <CardTitle className='leading-7'>{question.content}</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(question.choices) && question.choices.length > 0 && (
              <RadioGroup
                value={question.response ?? ''}
                className='gap-2'
                aria-label='Choices'
              >
                {question.choices.map((choice, idx) => (
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      key={idx}
                      value={choice}
                      id={`q${question.questionId}-choice${idx}`}
                    />
                    <Label htmlFor={`q${question.questionId}-choice${idx}`}>
                      {choice}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {/* Render more question details here if needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
