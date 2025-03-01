import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

export default function EmailVerification() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef(new Array(6).fill(null));
    const navigate = useNavigate();

    const {error , isLoading, verifyEmail} = useAuthStore()

    const handleChange = (index, value) => {
        let newCode = [...code];

        if (value.length > 1) {
            // Handle full paste (6-digit code)
            const pastedCode = value.slice(0, 6).split("");
            newCode = pastedCode.concat(new Array(6 - pastedCode.length).fill("")); // Ensure it's 6 digits 
            setCode(newCode);

            // Move focus to the last input
            inputRefs.current[5]?.focus();
        } else {
            // Normal input behavior
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            const newCode = [...code];
            newCode[index - 1] = "";
            setCode(newCode);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const enteredCode = code.join("");
        try {
            await verifyEmail(enteredCode)
            navigate("/");
            toast.success("Email verified successfully")
        } catch (error) {
            toast.error(error)
        }

    };

    // Auto-submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
           <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2 className='text-3xl font-bold mb-6 text-center text-green-500'>Email Verification</h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email</p>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-between gap-2'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={(e) => handleChange(index, e.clipboardData.getData("text"))} // Handle paste event
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2
                                border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'
                            />
                        ))}
                    </div>
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none
                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Verify Email"}
                    </motion.button>
                </form>
            </motion.div>
    );
}
