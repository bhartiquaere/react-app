import React, { useState } from 'react';
import { GetloginAPI, getLoginAPI } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from "../../assets/img/logo2.png";
import { useForm } from 'react-hook-form';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (e) => {
    const data = {
      email: e.email,
      password: e.password
    };
    console.log(data, "login")
    getLoginAPI(data)
    // GetloginAPI(data)
      .then((res) => {
        if (res.data.status === 'Success') {
          localStorage.setItem('accessToken', res.data.data.token);
          navigate('/dashboard');
        } else {
          console.log('Error: Login failed');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              <div className="account-logo">
                <Link href="#">
                  <img src={logo2} alt="Dreamguy's Technologies" />
                </Link>
              </div>
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="input-block mb-4">
                      <label className="col-form-label">Email Address</label>
                      <input
                        className="form-control"
                        type="email"
                        value={watch(`email`)}
                        {...register("email", { required: true })}
                      />
                      <span className="invalid"
                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                      >
                        {errors.email?.type === "required" && "Email is Required."}
                      </span>
                    </div>
                    <div className="input-block mb-4">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                          <Link className="text-muted" href="forgot-password.html">
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="position-relative">
                        <input
                          className="form-control"
                          type="password"
                          value={watch(`password`)}
                          {...register("password", { required: true })}
                          id="password"
                        />
                        <span className="fa-solid fa-eye-slash" id="toggle-password"></span>
                        <span className="invalid"
                          style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                        >
                          {errors.password?.type === "required" && "Password is Required."}
                        </span>
                      </div>
                    </div>
                    <div className="input-block mb-4 text-center">
                      <button className="btn btn-primary account-btn" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="account-footer">
                      <p>
                        Don't have an account yet? <a href="register.html">Register</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
