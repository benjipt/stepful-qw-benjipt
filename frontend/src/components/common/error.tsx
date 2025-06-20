import React from 'react';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
    <h1 className='text-6xl font-bold text-black mb-4'>Error</h1>
    <h2 className='text-2xl font-semibold text-black mb-2'>
      Something went wrong
    </h2>
    <p className='text-black mb-6 text-center max-w-md'>
      {message ?? 'An unexpected error has occurred. Please try again later.'}
    </p>
    <a
      href='/'
      className='px-6 py-2 bg-gray-900 text-white rounded hover:bg-black transition-colors'
    >
      Go Home
    </a>
  </div>
);

export default Error;
