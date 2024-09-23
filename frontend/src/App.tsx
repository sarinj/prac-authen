import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/authenticated/home'
import { AuthProtectedRoutes } from './lib/authProtectedRoutes'
import AuthLayout from './pages/authenticated/authLayout'
import NotFoundPage from './pages/notFoundPage'
import { UnProtectedRoutes } from './lib/unProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnProtectedRoutes />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<AuthProtectedRoutes />}>
            <Route path='/' element={<HomePage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
