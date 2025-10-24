// src/components/PublicRoute.jsx
// @ts-nocheck
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = localStorage.getItem("token");

  if (user) {
    // if logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}
