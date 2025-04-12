import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

const Nav = () => {
  return (
    <>
        <div className='flex justify-between py-3 px-20 backdrop-blur-lg shadow-[0_10px_25px_rgba(0,0,0,0.10)]'>
            <div className='flex items-center'>
                <h3 className='navlogo relative font-semibold text-[22px]'>ChatRoom</h3>
            </div>
            <div className='flex items-center'>
                <ul className='flex gap-5 bg-gray-100 py-2 px-7 rounded-3xl'>
                    <li>About</li>
                    <li>Features</li>
                    <li>Benefits</li>
                    <li>Plan</li>
                </ul>
            </div>
            <div className='flex items-center'>
                <button className='bg-gray-100 pl-4 p-1 rounded-3xl flex items-center'>Try out! <span className='p-2 text-[22px] ml-2 bg-green-200 rounded-full '><MdOutlineArrowOutward /></span></button>
            </div>
        </div>
    </>
  )
}

export default Nav