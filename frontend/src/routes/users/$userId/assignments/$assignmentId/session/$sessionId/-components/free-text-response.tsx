import { Textarea } from '@/components/ui/textarea';

interface Props {
  questionId: number;
  existingResponse?: string;
  onChange: (value: string) => void;
}

const FreeTextResponse: React.FC<Props> = ({
  questionId,
  existingResponse,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='grid w-full gap-1'>
      <Textarea
        id={`q${questionId}-text-response`}
        placeholder='Type your answer here...'
        value={existingResponse ?? ''}
        onChange={handleChange}
      />
      <p className='text-muted-foreground text-xs'>
        This response will be graded by AI
      </p>
    </div>
  );
};

export default FreeTextResponse;
