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
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "./stores/authSlice";
import NotFound from "./pages/notfound/NotFound";
import HistoryDetail from "./pages/history/HistoryDetail";


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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthenticated(true));
    }else {
      dispatch(setAuthenticated(false)); 
    }
  }, [dispatch]);
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
                {/* Public Routes */}
                <Route path="/SignIn" element={<PublicRoute isAuthenticated={isAuthenticated}><SignIn /></PublicRoute>} />
                <Route path="/SignUp" element={<PublicRoute isAuthenticated={isAuthenticated}><SignUp /></PublicRoute>} />
                <Route path="/ForgotPassword" element={<PublicRoute isAuthenticated={isAuthenticated}><ForgotPassword /></PublicRoute>} />
                <Route path="/ResetPassword" element={<PublicRoute isAuthenticated={isAuthenticated}><ResetPassword /></PublicRoute>} />

                {/* Private Routes */}
                <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
                <Route path="/createquizset" element={<PrivateRoute isAuthenticated={isAuthenticated}><QuizCreate /></PrivateRoute>} />
                <Route path="/quizsetview/:quizId" element={<PrivateRoute isAuthenticated={isAuthenticated}><QuizSetView /></PrivateRoute>} />
                <Route path="/quiz/:quizId" element={<PrivateRoute isAuthenticated={isAuthenticated}><Quiz /></PrivateRoute>} />
                <Route path="/result" element={<PrivateRoute isAuthenticated={isAuthenticated}><Result /></PrivateRoute>} />
                <Route path="/topic" element={<PrivateRoute isAuthenticated={isAuthenticated}><Topic /></PrivateRoute>} />
                <Route path="/createtopic" element={<PrivateRoute isAuthenticated={isAuthenticated}><TopicCreate /></PrivateRoute>} />
                <Route path="/quizsetlibrary" element={<PrivateRoute isAuthenticated={isAuthenticated}><QuizSetLibrary /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute isAuthenticated={isAuthenticated}><History /></PrivateRoute>} />
                <Route path="/historydetail"  element={<PrivateRoute isAuthenticated={isAuthenticated}><HistoryDetail /></PrivateRoute>} />
                <Route path="/topic/:topicId" element={<PrivateRoute isAuthenticated={isAuthenticated}><TopicView /></PrivateRoute>} />
                <Route path="/test" element={<PrivateRoute isAuthenticated={isAuthenticated}><Test /></PrivateRoute>} />

                <Route path="*" element={<NotFound/> } />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
