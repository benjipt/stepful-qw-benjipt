interface Props {
  totalQuestions: number;
  totalCorrect: number;
}

const ResultsSummary: React.FC<Props> = ({ totalQuestions, totalCorrect }) => {
  return (
    <div className='mb-2 text-sm text-neutral-700 flex flex-wrap gap-x-8 gap-y-1'>
      <div>
        <span className='mr-1'>Total Questions:</span>
        <span className='font-mono text-neutral-900'>{totalQuestions}</span>
      </div>
      <div>
        <span className='mr-1'>Total Correct:</span>
        <span className='font-mono text-neutral-900'>{totalCorrect}</span>
      </div>
    </div>
  );
};

export default ResultsSummary;
