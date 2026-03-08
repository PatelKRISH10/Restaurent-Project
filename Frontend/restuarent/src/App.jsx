import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Menu from "../Pages/Menu";
import Kitchen from "../Pages/Kitchen";
import Collection from "../Pages/Collection";
import DiningDashboard from "../Pages/DiningDashboard";

import ProtectedRoute from "../component/ProtectedRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route
          path="/login"
          element={
            user
              ? user.role === "staff"
                ? <Navigate to="/kitchen" />
                : <Navigate to="/home" />
              : <Login />
          }
        />
        <Route path="/signup" element={<Signup />} />

        {/* CUSTOMER ROUTES */}
        <Route
          element={
            <ProtectedRoute role="customer">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dining" element={<DiningDashboard />} />
        </Route>

        {/* STAFF ROUTES */}
        <Route
          element={
            <ProtectedRoute role="staff">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/collection" element={<Collection />} />
        </Route>

        {/* FALLBACK (IMPORTANT FIX) */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
