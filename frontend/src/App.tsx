import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/authenticated/home'
import { AuthProtectedRoutes } from './lib/authProtectedRoutes'
import AuthLayout from './pages/authenticated/authLayout'
import NotFoundPage from './pages/notFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<AuthLayout />}>
          <Route element={<AuthProtectedRoutes />}>
            <Route path='/home' element={<HomePage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
