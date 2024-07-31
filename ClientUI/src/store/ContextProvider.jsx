
import React, { createContext, useReducer } from 'react'

export const ContextApi=createContext(); 


export default function ContextProvider({children}) {

  return (
    <>
        <ContextApi.Provider value={{}}>

            {children}

        </ContextApi.Provider>
    </>
  )
}
