// src/components/AuthRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  
  return children;
}
