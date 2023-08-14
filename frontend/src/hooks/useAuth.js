import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { api } from "../config/axiosConfig";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  // set user in context and navigate them home
  const setUserContext = async () => {
    try {
      const res = await api.request({
        url: "/api/current-user/",
        method: "GET",
      });
      console.log(res, "userContext useauth user");
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.detail, "usercontext err");
      setError(err.response.data.detail);
    }
  };

  // register user
  const registerUser = async (user) => {
    try {
      await api.request({
        url: "/api/user-register/",
        method: "POST",
        data: user,
      });
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.detail, "register user useauth");
      setError(err.response.data.detail);
    }
  };

  // login user
  const loginUser = async (user) => {
    try {
      await api.request({
        url: "/api/user-login/",
        method: "POST",
        data: user,
      });
      await setUserContext();
    } catch (err) {
      console.log(err.response.data.detail, "err");
      setError(err.response.data.detail);
    }
  };

  //logout user
  const logoutUser = async () => {
    try {
      await api.request({
        url: "/api/user-logout/",
        method: "POST",
      });
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.detail, "err");
      setError(err.response.data.detail);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    error,
  };
}
