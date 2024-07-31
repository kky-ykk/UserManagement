import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./validate";


export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  //----- geting inputs data on inputs
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  //--------------- fetching form datas
  const fetchData = async (e) => {
    e.preventDefault();

    const res = Validation(credentials);
    setErrors(res);

    if (Object.entries(res).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/user/signup', {
          name: credentials.name,
          mobile: credentials.mobile,
          email: credentials.email,
          address: credentials.address,
          password: credentials.password
        });

        console.log("response", response.status);

        if (response.status === 200) {
          alert("Register successfully!");
          navigate("/login");
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
      <h1 className="text-warning text-center">User Management</h1>

      <div className="container bg-light text-dark fw-bold rounded p-5 mt-5">
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
                onChange={(e) => onChange(e)}
                required
              />
              {errors.name && (<p style={{ color: '#c93939' }}>{errors.name}</p>)}          {/* inputs data validations */}
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
                onChange={(e) => onChange(e)}
                required
              />
              {errors.address && (<p style={{ color: '#c93939' }}>{errors.address}</p>)}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
                onChange={(e) => onChange(e)}
                required
              />
              {errors.password && (<p style={{ color: '#c93939' }}>{errors.password}</p>)}
            </div>
            <div className="text-center m-2">
              <button className="btn btn-primary">Register</button>
              <Link className="mt-3 text-primary m-3" to="/login">
                Already have account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
