import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import SignIn from "./pages/signin/SignIn";
// const SignIn = lazy(() => import("./pages/signin/SignIn"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Box display={'flex'}>
          {/* {isAuthenticated && <Sidebar />} */}
          <Box flex={1}>
            {/* {!isAuthenticated && <Header />} */}
            <Routes>
              <Route path="/" element={<SignIn />} />
              {/* Other routes can be added here */}
            </Routes>
          </Box>
        </Box>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
