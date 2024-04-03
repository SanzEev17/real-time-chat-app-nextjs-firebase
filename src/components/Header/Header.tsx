import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='fixed w-full px-14 lg:px-36 py-4 flex justify-between items-center bg-accent shadow-md'>
        <h1 className='text-2xl font-bold'>Guff Gaff</h1>
        <Button variant="outline" className='font-semibold'>Signup</Button>
    </div>
  )
}

export default Header