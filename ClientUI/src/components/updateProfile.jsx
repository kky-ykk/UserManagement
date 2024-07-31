import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import Validation from "./validate";
import { useNavigate } from "react-router-dom";

//------------ updating prfile wiht new inputs daas
export default function UpdateProfile() {
  const [user,setUser]=useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const session=localStorage.getItem("session");
  const token=JSON.parse(session).token;

  
        
  //---------------geting previous or current datas
  const getDatasWithToken=async ()=>{
    try {
      
        const response=await axios.get("http://localhost:3000/user/getProfile",{
            headers: { Authorization: `Bearer ${token}` }
        });

        let datas=await response.data;
        delete datas.password;
        setUser({name:datas.name,mobile:datas.mobile,email:datas.email,address:datas.address});
    } catch (error) {
        console.log(error);            
    }
  }

  useEffect(()=>{
    getDatasWithToken();
  },[]);

  const onChange=(event)=>{
    setUser({ ...user, [event.target.name]: event.target.value });
  }


  //------------ validating new inputs datas and updating db
  async function fetchData(e){
    e.preventDefault();

    const res = Validation(user);

    if(Object.keys(user).indexOf('password')==-1 && Object.keys(res).indexOf('password')>-1){
      
      delete res.password;
    }

    setErrors(res);

    if (Object.entries(res).length === 0) {
      // console.log("updating.....................");
      try {
        const response = await axios.put('http://localhost:3000/user/update',user,{
          headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' }
      });


        if (response.status === 200) {
          alert("Updated successfully!");
          navigate("/");
        } else {
          alert("Datas already present");
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Datas already present");
      }
    }

  }

  return (
    <div>
      <Navbar/>
      <div className="container bg-light text-dark fw-bold rounded p-5 mt-5">
        <h5 className="text-black">Enter new values that will replace old one</h5>
        <div>
          <form onSubmit={(e) => fetchData(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="name"
                name="name"
                className="form-control"
                value={user.name}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.name && (<p style={{ color: '#c93939' }}>{errors.name}</p>)}

            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={user.email}
                aria-describedby="emailHelp"
                onChange={(e) => onChange(e)}
                required
              />
              {errors.email && (<p style={{ color: '#c93939' }}>{errors.email}</p>)}

            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputMobile" className="form-label">
                Mobile
              </label>
              <input
                type="mobile"
                className="form-control"
                name="mobile"
                onChange={(e) => onChange(e)}
                value={user.mobile}
                required
              />
              {errors.mobile && (<p style={{ color: '#c93939' }}>{errors.mobile}</p>)}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={user.address}
                onChange={(e) => onChange(e)}
                required
              />
              {errors.address && (<p style={{ color: '#c93939' }}>{errors.address}</p>)}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
                onChange={(e) => onChange(e)}
              />
              {errors.password && (<p style={{ color: '#c93939' }}>{errors.password}</p>)}
            </div>
            <div className="text-center m-2">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
