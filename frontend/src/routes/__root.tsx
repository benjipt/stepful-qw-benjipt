import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className='flex flex-col min-h-screen'>
      <div className='flex items-center p-1 justify-center border border-neutral-300 bg-neutral-50 relative'>
        <Link to='/' className='cursor-pointer'>
          <h1 className='text-xl font-bold'>Stepful QuizWizard</h1>
        </Link>
      </div>
      <div className='flex-1 flex flex-col mt-18 pb-24'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
