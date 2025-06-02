import React from "react"

interface AuthLayout {
    children:React.ReactNode
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
