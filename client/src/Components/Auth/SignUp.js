import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Signup() {
    
  const [signupState, setSignupState] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signupState.email && signupState.password) {

        const body = JSON.stringify(signupState);

        const config = {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body
        }

        console.log(signupState)

        const response = await fetch('/api/users', config);
        const data = await response.json();
        console.log('signup', data);
        localStorage.setItem('accessToken', data.accessToken);
      }
    } catch (error) {
      // set error state
      console.log('sign up error', error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>

        <Link to="/login">signin</Link>
      </div>
    </>
  );
}
