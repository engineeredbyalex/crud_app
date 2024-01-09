import React from 'react'

export const Button = ({children}) => {
  return (
    <button className='px-2 py-2 rounded-md bg-black text-white min-w-[8rem]  uppercase'>{children}</button>
  )
}


export const RedButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-red-500 text-white min-w-[8rem]  uppercase'>{children}</button>
  )
}
export const GreenButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-green-500 text-white min-w-[8rem]  uppercase'>{children}</button>
  )
}
export const BlueButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white w-full uppercase'>{children}</button>
  )
}
