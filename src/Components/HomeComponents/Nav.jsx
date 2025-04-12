import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

const Nav = () => {
  return (
    <>
        <div className='flex justify-between py-5 px-15 '>
            <div>
                <h3 className='navlogo relative font-semibold text-[22px]'>ChatRoom</h3>
            </div>
            <div>
                <ul className='flex gap-5 bg-gray-100 py-2 px-7 rounded-3xl'>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                </ul>
            </div>
            <div>
                <button className='bg-gray-100 pl-4 p-1 rounded-3xl flex items-center'>Try out! <span className='p-2 text-[22px] ml-2 bg-green-200 rounded-full '><MdOutlineArrowOutward /></span></button>
            </div>
        </div>
    </>
  )
}

export default Nav