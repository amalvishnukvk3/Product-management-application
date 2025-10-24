// src/components/ProtectedRoute.jsx
// @ts-nocheck
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("token"); // stored after login

  if (!user) {
    // if not logged in, redirect to sign in
    return <Navigate to="/signin" replace />;
  }

  return children; // if logged in, render normally
}
