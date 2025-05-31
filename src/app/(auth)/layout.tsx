import React, { HtmlHTMLAttributes } from 'react'
interface AuthLayout extends HtmlHTMLAttributes<HTMLDivElement>{
    
}
export default function AuthLayout({children}:AuthLayout) {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full max-w-sm md:max-w-3xl'>
             {children}
            </div>
        </div>
    )
}
