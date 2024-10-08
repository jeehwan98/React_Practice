import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import ProductDetailPage from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: '/', element: < HomePage /> },
      { index: true, element: < HomePage /> }, // Feature called (Index Route) index: true -> simply means that it's the default route that should be displayed if the parent routes path is currently active
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:productId', element: <ProductDetailPage /> }, // : signals to react router dom that this part of the path is dynamic, so we actually don't want
    ],
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
