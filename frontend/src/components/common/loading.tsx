import React from 'react';

const dotStyle = { backgroundColor: '#000' };

const Loading: React.FC = () => (
  <div className='flex items-center justify-center min-h-screen w-full'>
    <span
      className='inline-flex items-center justify-center'
      aria-label='Loading'
      role='status'
    >
      <span className='sr-only'>Loading</span>
      <span className='flex gap-1'>
        <span
          className='w-1.5 h-1.5 rounded-full animate-bounce-dot'
          style={dotStyle}
        />
        <span
          className='w-1.5 h-1.5 rounded-full animate-bounce-dot delay-150'
          style={dotStyle}
        />
        <span
          className='w-1.5 h-1.5 rounded-full animate-bounce-dot delay-300'
          style={dotStyle}
        />
      </span>
    </span>
  </div>
);

export default Loading;
