import React, { createContext, useState } from 'react'

export const Context = createContext()

export const Provider = ({ children }) => {
  const [cart, setCart] = useState([])

  const value = {
    cart,
    setCart,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}