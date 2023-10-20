import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { AuthenticationGuard } from './components/AuthenticationGuard';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <AuthenticationGuard component={HomePage} />,
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
