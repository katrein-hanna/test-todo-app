import React from "react";
import { Navigate } from "react-router-dom";

function RootRedirect() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/todos" /> : <Navigate to="/login" />;
}

export default RootRedirect;
