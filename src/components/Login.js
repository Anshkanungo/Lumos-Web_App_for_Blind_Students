import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="login-page">
        <h1 className="login-heading">Login</h1>
        <form className="form-container">
          <div className="label-input-container">
            <label className="label-field" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              autoComplete="tel"
              id="mobile"
              inputMode="tel"
              placeholder="Enter your mobile number"
              type="tel"
              className="input-field"
            />
            <input
              autoComplete="tel"
              id="otp"
              inputMode="tel"
              placeholder="Enter OTP"
              type="tel"
              className="input-field"
            />
          </div>
          <button className="get-otp" type="submit">
            Get OTP
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
