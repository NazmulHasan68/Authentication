import React from 'react'

export default function Input({icon:Icon, ...props}) {
  return (
    <div className=' relative mb-4'>
      <div className=' absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className="size-5 text-green-500"/>
      </div>
      <input {...props} className='w-full pl-10 py-2 pr-3 bg-gray-800 bg-opacity-50 rounded-lg border 
      border-gray-700 focus:border-green-500 focus:right-2 focus:ring-green-500 text-white
       placeholder-gray-400 transition duration-200'/>
    </div>
  )
}
