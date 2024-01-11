import React from 'react'

export const Button = ({children}) => {
  return (
    <button className='px-2 py-2 rounded-md bg-black text-white w-[15rem] uppercase'>{children}</button>
  )
}


export const RedButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-red-500 text-white w-[15rem]  uppercase'>{children}</button>
  )
}
export const GoldButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-[#EEAA74] text-white  w-[15rem] uppercase font-semibold hover:bg-[#f5b37c] transition-all ease-in-out'><p>{children}</p></button>
  )
}
export const BlueButton = ({ children }) => {
      return (
    <button className='px-2 py-2 rounded-md bg-[#3F4365] hover:bg-[#636B97] text-white  w-[15rem] uppercase transition-all ease-in-out'>{children}</button>
  )
}
