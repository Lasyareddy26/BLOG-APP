import { createContext, useState } from "react";
export const userAuthorContextObj=createContext()
import React from 'react'

function UserAuthCont({children}) {
    let [currentuser,setcurrentuser]=useState({
        firstName:"",
        lastName:"",
        email:"",
        profileImageUrl:""
    })
  return (
    <userAuthorContextObj.Provider value={{currentuser,setcurrentuser}}>
        {children}
    </userAuthorContextObj.Provider>
  )
}

export default UserAuthCont