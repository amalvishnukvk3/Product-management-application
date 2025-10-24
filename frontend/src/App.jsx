// @ts-nocheck
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/Home";
import ProductDetailsPage from "./pages/Product/ProductsDetails";
import ProtectedRoute from "./components/components/ProtectedRoute";
import PublicRoute from "./components/components/PublicRoute";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (only visible if NOT logged in) */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected Routes (only visible if logged in) */}
<Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
