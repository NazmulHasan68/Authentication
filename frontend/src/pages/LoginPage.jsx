import React, { useState } from 'react'
import {motion} from "framer-motion"
import Input from '../components/compoent/Input';
import { Loader, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setemail] = useState(" ");
  const [password, setpassword] = useState("");
  const isLoading = false;
  
  const handleLogin =(e)=>{
    e.preventDefault()
  }
  return (
    <motion.div
    initial={{opacity:0, y:20}}
    animate = {{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-green-500'>
            Create Account
        </h2>

        <form onSubmit={handleLogin}>
          <Input 
                icon={Mail} 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e)=> setemail(e.target.value)}
            />

            <Input 
                icon={Lock} 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e)=> setpassword(e.target.value)}
            />
          <div className='flex items-center mb-2'>
            <Link to={'/forgot-password'} className='text-sm text-green-400 hover:underline'>
              Forgot password
            </Link>
          </div>

          <motion.button
              className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                  font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none
                  focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                  whileHover={{scale:1.02}}
                  whileTap={{scale:0.98}}
                  type='submit'
              >
                {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> : "Login"} 
          </motion.button>
        </form>
      </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
              Don't have account? {" "}
              <Link to={'/signup'} className='text-green-400 hover:underline'>Singup</Link>
            </p>
        </div>
    </motion.div>
  )
}
