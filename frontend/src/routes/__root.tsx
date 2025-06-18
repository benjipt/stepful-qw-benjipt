import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex items-center justify-center border border-neutral-300 bg-neutral-50'>
        <h1 className='text-xl font-bold'>Stepful QuizWizard</h1>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
