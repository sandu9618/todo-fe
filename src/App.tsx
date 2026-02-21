import { Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './components/signup'
import Login from './components/login'
import Todo from './components/todo'
import Navbar from './components/navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
