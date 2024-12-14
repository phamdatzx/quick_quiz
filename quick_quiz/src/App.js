import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Box, ThemeProvider } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import theme from "./config/customizations/uicustomization";
import Home from "./pages/home/Home";
import QuizCreate from "./pages/quizset/QuizCreate";
import Topic from "./pages/topic/Topic";
import QuizSetLibrary from "./pages/quizset/QuizSetLibrary";
import History from "./pages/history/History";
import TopicView from "./pages/topic/TopicView";
import QuizSetView from "./pages/quizset/QuizSetView";
import TopicCreate from "./pages/topic/TopicCreate";


const Sidebar = lazy(() => import("./components/Sidebar"));
const Header = lazy(()=> import("./components/Header"));
const SignIn = lazy(() => import("./pages/signin/SignIn"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const ForgotPassword = lazy(() => import("./pages/forgotpassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/resetpassword/ResetPassword")) 
const Quiz = lazy(() => import("./pages/quiz/Quiz"));
const Result = lazy(() => import("./pages/quiz/Result"));
const Test = lazy(() => import("./pages/quizset/QuizSetCard"));

function App() {
  let isAuthenticated = true;
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div>
            <Box sx={{ position: "absolute", width: "100vw", top: "45%" }}>
              <LinearProgress sx={{ height: "10vh" }} />
            </Box>
          </div>} >
        <ThemeProvider theme={theme}>
          <Box display={"flex"} sx={{height:'100%', backgroundColor:'#FBF9F9'}}>
            {isAuthenticated && <Sidebar />}
            <Box flex={1}>
              {isAuthenticated && <Header />}
              <Routes>
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />\
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="/test" element={<Test />} />
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/createquizset" element={<QuizCreate />} />
                <Route path="/quizsetview/:id" element={<QuizSetView/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/topic" element={<Topic />} />
                <Route path="/createtopic" element={<TopicCreate />} />
                <Route path="/result" element={<Result />} />
                <Route path="/quizsetlibrary" element={<QuizSetLibrary />} />
                <Route path="/history" element={<History />} />
                <Route path="/topic/:id" element={<TopicView />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
