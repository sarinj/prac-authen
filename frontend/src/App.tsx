import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './routes/login'
import HomePage from './routes/home'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/home', element: <HomePage /> },
  ])
  return <RouterProvider router={router} />
}

export default App
