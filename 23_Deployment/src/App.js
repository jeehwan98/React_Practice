import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog')); // not a valid function component as it doesn't return a JSX code and this here is returning a promise value
const PostPage = lazy(() => import('./pages/Post'));
// therefore in order to import it, we use the lazy function

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element:
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>,
            loader: () =>
              import('./pages/Blog').then(module => module.loader()) // because the import passes us a Promise (because it is an asynchronous process), 
          },
          {
            path: ':id',
            element:
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>,
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta))
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
