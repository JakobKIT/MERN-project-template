import React from 'react';

const RegisterContainer = (
  { formSubmitted, onChange },
) => (
  <div className="container-md mt-5">
    <form>
      <div className="container-fluid bg-primary pt-2 pb-2 text-light rounded-top">
        <h2 className="text-center">
          MERN Stack Template Project
        </h2>
      </div>
      <div className="container-fluid border pb-3 pt-3 rounded-bottom">
        <div className="form-group">
          <label htmlFor="userName">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">
            Repeat the Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            onChange={onChange}
          />
        </div>
        <div className="row justify-content-center">
          <button
            className="btn btn-success"
            onClick={formSubmitted}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default RegisterContainer;
