import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/Home";
import ProductDetailsPage from "./pages/Product/ProductsDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
