const NotFound: React.FC = () => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
    <h1 className='text-6xl font-bold text-black mb-4'>404</h1>
    <h2 className='text-2xl font-semibold text-black mb-2'>Page Not Found</h2>
    <p className='text-black mb-6 text-center max-w-md'>
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <a
      href='/'
      className='px-6 py-2 bg-gray-900 text-white rounded hover:bg-black transition-colors'
    >
      Go Home
    </a>
  </div>
);

export default NotFound;
