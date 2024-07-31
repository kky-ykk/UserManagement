import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Home() {

  let userName=null;

  const session=localStorage.getItem("session");

  if(session){
    userName=JSON.parse(session).name;
  }

  

  return (
    <div>
      <Navbar />
       <div style={{height:"90vh"}}>

      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        <h1>
            Welcome to userManament App
        </h1>
        {
            userName?"" :(<h2 className="text-primary">Login or Signup</h2>)
        }
      </div>
       </div>
    </div>
  );
}
