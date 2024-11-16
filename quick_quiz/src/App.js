import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import theme from "./config/customizations/uicustomization";
// const SignIn = lazy(() => import("./pages/signin/SignIn"));
const SignIn = lazy(() => import("./pages/signin/SignIn"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const ForgotPassword = lazy(() => import("./pages/forgotpassword/ForgotPassword"));
const ResetPassword = lazy(()=> import("./pages/resetpassword/ResetPassword")) 
const Test = lazy(() => import("./pages/TestingComponent"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
        <Box display={'flex'}>
          {/* {isAuthenticated && <Sidebar />} */}
          <Box flex={1}>
            {/* {!isAuthenticated && <Header />} */}
            <Routes>
              <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />\
                <Route path="/Reset" element={<ResetPassword/>} />
            </Routes>
          </Box>
        </Box>
        </ThemeProvider>
        
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
