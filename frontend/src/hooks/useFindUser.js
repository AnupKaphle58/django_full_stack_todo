import { useState, useEffect } from "react";
import { api } from "../config/axiosConfig";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      await api
        .request({
          url: "/api/current-user/",
          method: "GET",
        })
        .then((res) => {
          console.log(res);
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.detail, "User find err");
          setLoading(false);
        });
    }
    findUser();
  }, []);
  return {
    user,
    isLoading,
  };
}
