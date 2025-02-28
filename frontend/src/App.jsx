import { Route, Routes } from 'react-router-dom'
import './App.css'
import FloatingShape from './components/compoent/FloatingShape'
import Home from './components/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EmailVerification from './pages/EmailVerification'

function App() {


  return (
    <div className='min-h-screen bg-gradient-to-tr from-gray-900 to-emerald-900 flex justify-center items-center relative overflow-hidden'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="60%" left="80%" delay={0}/>
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="40%" left="-10%" delay={0}/>

      <Routes>
        <Route path='/' element={"Home"}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/verify-email' element={<EmailVerification/>}/>
      </Routes>
    </div>
  )
}

export default App
