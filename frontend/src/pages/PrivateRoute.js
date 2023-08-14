import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "./../hooks/UserContext";

export default function PrivateRoute({ element: Element, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (user) {
    return <Route {...rest} element={<Element />} />;
  }

  // Redirect if there is no user
  return <Navigate to="/login" />;
}
