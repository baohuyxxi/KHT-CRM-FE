import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "~/components/AuthRoute/AuthRoute";

const Login = lazy(() => import("../pages/Login"));
const DashboardLayout = lazy(() =>
  import("../pages/Dashboard/DashboardLayout")
);
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../pages/ResetPassword")
);

export default function Auth() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<div></div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<div></div>}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Suspense fallback={<div></div>}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<div></div>}>
            <DashboardLayout />
          </Suspense>
        }
      />
    </Routes>
  );
}
