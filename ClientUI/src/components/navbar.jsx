import React, { useContext } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {

  let userName=null;
  const session=localStorage.getItem("session");
  if(session){
    userName=JSON.parse(session).name;
    // console.log("session:",userName);
  }

  return (
    <>
      <nav className="container-fluid navbar bg-body-tertiary bg-warning">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/">{userName?userName:""}</Link>
    
    {
        userName?(
            <div className="d-flex" >
            <Link className="btn bg-primary mx-3" to="/profile" >
                View Profile
            </Link>
            <Link className="btn bg-primary mx-3"  onClick={()=>{localStorage.clear()}} to="/">
                Logout
            </Link>
            </div>
        ):(
            <div className="d-flex" >
            <Link className="btn bg-primary mx-3" to="/login">
                Login
            </Link>
            <Link className="btn bg-primary mx-3" to="/signup">
                Signup
            </Link>
            </div>
        )
    }
    
  </div>
</nav>

    </>
  );
}
