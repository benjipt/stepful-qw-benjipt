import { createFileRoute } from '@tanstack/react-router';

import RenderIf from '@/components/common/render-if';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { loadAssignmentQuestions } from '@/lib/loaders';
import FreeTextResponse from './-components/free-text-response';

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
    <div className='page'>
      <div className='flex flex-col gap-4 px-8 items-center'>
        {questions?.map(question => {
          const isMultipleChoice =
            Array.isArray(question.choices) && question.choices.length > 0;
          return (
            <Card key={question.questionId} className='w-md'>
              <CardHeader>
                <CardTitle className='leading-7'>{question.content}</CardTitle>
              </CardHeader>
              <CardContent>
                <RenderIf condition={isMultipleChoice}>
                  <RadioGroup
                    defaultValue={question.response ?? ''}
                    className='gap-2'
                    aria-label='Choices'
                  >
                    {question.choices?.map((choice, idx) => (
                      <div className='flex items-center space-x-3' key={idx}>
                        <RadioGroupItem
                          value={choice}
                          id={`q${question.questionId}-choice${idx}`}
                          className='cursor-pointer'
                        />
                        <Label htmlFor={`q${question.questionId}-choice${idx}`}>
                          {choice}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </RenderIf>
                <RenderIf condition={!isMultipleChoice}>
                  <FreeTextResponse
                    questionId={question.questionId}
                    existingResponse={question.response ?? undefined}
                  />
                </RenderIf>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
