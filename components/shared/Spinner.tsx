import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className='flex-1 flex justify-center items-center'>
      <Loader2 className='text-blue-500 size-7 animate-spin' />
    </div>
  )
}

export default Spinner