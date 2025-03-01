import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import FloatingShape from './components/compoent/FloatingShape'
import Home from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EmailVerification from './pages/EmailVerification'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'


//protect routes that require authentication
const ProtectedRoute = ({children}) =>{
  const { isAuthenticated , user } = useAuthStore()
  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }
  if(!user.isVerified){
    return <Navigate to="/verify-email" replace/>
  }

  return children
}

//redirect authrnticated users to the home page
const RedirectAuthenticatedUser = ({children}) =>{
  const { isAuthenticated, user} = useAuthStore()
  if( isAuthenticated && user.isVerified){
    return <Navigate to='/' replace/>
  }
  return children;
}

function App() {

  const { isCheckingAuth, checkAuth, isAuthenticated , user} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(isAuthenticated, user);
  

  return (
    <div className='min-h-screen bg-gradient-to-tr from-gray-900 to-emerald-900 flex justify-center items-center relative overflow-hidden'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="60%" left="80%" delay={0}/>
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="40%" left="-10%" delay={0}/>

      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignupPage/></RedirectAuthenticatedUser>}/>
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
        <Route path='/verify-email' element={<EmailVerification/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
