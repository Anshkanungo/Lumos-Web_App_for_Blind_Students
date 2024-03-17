import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToggle, setOtpToggle] = useState(false);

  const toggleOtpInput = () => {
    setOtpToggle(!otpToggle);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  const handleClick = () => {
    setOtpToggle(true);
    console.log(email, otp);
  };

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
              placeholder="Enter your Email"
              type="tel"
              className="input-field"
              onChange={(e) => handleEmailChange(e)}
            />
            <input
              autoComplete="tel"
              id="otp"
              inputMode="tel"
              placeholder="Enter OTP"
              type="tel"
              className="input-field"
              style={{ display: otpToggle ? "block" : "none" }}
              onChange={(e) => handleOtpChange(e)}
            />
          </div>
          <button className="get-otp" type="button" onClick={handleClick}>
            Get OTP
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
