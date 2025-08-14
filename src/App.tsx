import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import CoursesPage from './pages/course'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
