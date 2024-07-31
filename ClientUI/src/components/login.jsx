import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });


  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const fetchDatas = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://usermanagement-igiq.onrender.com/user/login', {
        email: credentials.email,
        password: credentials.password
      });


      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('session', JSON.stringify({token:data.token,name:data.name}));
        navigate("/");
      } else {
        alert("Datas wrong");
      }
    } catch (error) {
      console.error('Axios error:', error);
      if (error.response && error.response.status === 401) {
        alert("Wrong email or password");
      } else {
        alert("An error occurred");
      }
    }
  };

  return (
    <div>
      <h1 className="text-warning text-center">User Management</h1>

      <div className="container bg-light text-dark fw-bold rounded p-5 mt-5">
        <div>
          <form onSubmit={(e) => fetchDatas(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="text-center m-2">
              <button className="btn btn-primary">
                Submit
              </button>
              <Link className="mt-3 text-primary m-3" to="/signup">
                I'm new user
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
