import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { Link } from "react-router-dom";


//------------- getting token from localhost and use it to get user Data
export default function ShowProfile() {
  
  const [user,setUser]=useState({});

  const getDatasWithToken=async ()=>{
    try {
      const session=localStorage.getItem("session");
        const token=JSON.parse(session).token;

        const response=await axios.get("http://localhost:3000/user/getProfile",{
            headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(response);
        let datas=await response.data;
        setUser(datas)
    } catch (error) {
        console.log(error);            
    }
  }

  useEffect(()=>{
    getDatasWithToken();
  },[]);


  return (
    <>
    <Navbar/>

    <div className="container  p-8">
      <div className="card profile-card">
        <div className="card-body">
          <h4 className="card-title text-center">Profile</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Mobile:</th>
                <td>{user.mobile}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Address:</th>
                <td>{user.address}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <Link type="Link" to="/update" className="btn btn-primary">Update</Link>
          </div>
        </div>
      </div>
    </div>
  </>

  );
}
