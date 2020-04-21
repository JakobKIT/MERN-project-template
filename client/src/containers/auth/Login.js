import React from 'react';

const LoginContainer = (
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
          <label htmlFor="user">
            Username or Email
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            name="user"
            aria-describedby="userHelp"
            onChange={onChange}
          />
          <small id="userHelp" className="form-text text-muted">
            You can use either your email or your username.
          </small>
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
        <div className="row justify-content-center">
          <button
            className="btn btn-success"
            onClick={formSubmitted}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default LoginContainer;
