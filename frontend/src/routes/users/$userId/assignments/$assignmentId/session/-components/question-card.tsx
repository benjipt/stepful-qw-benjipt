import RenderIf from '@/components/common/render-if';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import FreeTextResponse from './free-text-response';

export interface Props {
  questionId: number;
  content: string;
  choices?: string[] | null;
  response?: string | null;
  points: number;
  onResponseChange?: (value: string) => void;
}

const QuestionCard: React.FC<Props> = ({
  questionId,
  content,
  choices,
  response,
  points,
  onResponseChange,
}) => {
  const isMultipleChoice = Array.isArray(choices) && choices.length > 0;
  return (
    <Card className='w-md'>
      <CardHeader>
        <CardTitle className='leading-7'>{content}</CardTitle>
        <div className='text-sm text-muted-foreground'>
          {points} point{points !== 1 ? 's' : ''}
        </div>
      </CardHeader>
      <CardContent>
        <RenderIf condition={isMultipleChoice}>
          <RadioGroup
            value={response ?? ''}
            onValueChange={onResponseChange}
            className='gap-2'
            aria-label='Choices'
          >
            {choices?.map((choice, idx) => (
              <div className='flex items-center space-x-3' key={idx}>
                <RadioGroupItem
                  value={choice}
                  id={`q${questionId}-choice${idx}`}
                  className='cursor-pointer'
                />
                <Label htmlFor={`q${questionId}-choice${idx}`}>{choice}</Label>
              </div>
            ))}
          </RadioGroup>
        </RenderIf>
        <RenderIf condition={!isMultipleChoice}>
          <FreeTextResponse
            questionId={questionId}
            existingResponse={response ?? undefined}
            onChange={onResponseChange}
          />
        </RenderIf>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
