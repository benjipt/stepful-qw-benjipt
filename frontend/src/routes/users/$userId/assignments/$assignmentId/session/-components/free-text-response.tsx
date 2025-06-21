import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';

interface Props {
  questionId: number;
  existingResponse?: string;
}

const FreeTextResponse: React.FC<Props> = ({
  questionId,
  existingResponse,
}) => {
  const [response, setResponse] = useState(existingResponse);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  return (
    <div className='grid w-full gap-1'>
      <Textarea
        id={`q${questionId}-text-response`}
        placeholder='Type your answer here...'
        value={response}
        onChange={handleChange}
      />
      <p className='text-muted-foreground text-xs'>
        This response will be graded by AI
      </p>
    </div>
  );
};

export default FreeTextResponse;
