import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import useAuth from "./../hooks/useAuth";
import useFindUser from "../hooks/useFindUser";

export default function Login() {
  const { loginUser, error } = useAuth();
  const { user, setUser, isLoading } = useFindUser();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    console.log(userDetails, "User from login");
    await loginUser(userDetails);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section class="vh-100 bg-image">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style={{ borderRradius: "15px" }}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Login to account
                  </h2>
                  {error && (
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <form>
                    <div class="form-outline mb-4">
                      <label class="form-label">Username</label>
                      <input
                        type="username"
                        id="username"
                        class="form-control form-control-lg"
                        value={userDetails.username}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            username: e.target.value,
                          });
                        }}
                        placeholder="Username"
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label">Password</label>
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        id="password"
                        value={userDetails.password}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            password: e.target.value,
                          });
                        }}
                        placeholder="Password"
                      />
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => handleSubmit()}
                      >
                        Login
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register">Register here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
