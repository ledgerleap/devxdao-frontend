import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const LoginView = lazy(() => import("../views/account/login/Login"));
const SignupWelcomeView = lazy(() =>
  import("../views/account/signup-welcome/SignupWelcome")
);
const SignupView = lazy(() => import("../views/account/signup/Signup"));
const ReviewTermsView = lazy(() => import("../views/review-terms/ReviewTerms"));
const VerifyKYCView = lazy(() => import("../views/verify-kyc/VerifyKYC"));

export default function AppRoutes({ auth }) {
  return (
    <Suspense fallback={null}>
      <Switch>
        <HomeRoute auth={auth} exact path="/" />
        <PublicRoute auth={auth} exact path="/login">
          <LoginView />
        </PublicRoute>
        <PublicRoute auth={auth} exact path="/register">
          <SignupWelcomeView />
        </PublicRoute>
        <PublicRoute auth={auth} exact path="/register/form">
          <SignupView />
        </PublicRoute>
        <PrivateRoute auth={auth} exact path="/review-terms">
          <ReviewTermsView />
        </PrivateRoute>
        <PrivateRoute auth={auth} exact path="/verify-kyc">
          <VerifyKYCView />
        </PrivateRoute>

        <Route>
          <h2 className="text-center mt-4 mb-3">Not Found</h2>
        </Route>
      </Switch>
    </Suspense>
  );
}
