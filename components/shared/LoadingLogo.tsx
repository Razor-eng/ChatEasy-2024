import React from 'react'
import { Loader } from 'lucide-react'

const LoadingLogo = () => {
    return (
        <div className='min-h-screen w-screen flex justify-center items-center'>
            <Loader className='text-blue-500 size-7 animate-spin' />
        </div>
    )
}

export default LoadingLogo