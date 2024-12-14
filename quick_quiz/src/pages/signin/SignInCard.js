import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../config/customizations/uicustomization.js";
import { userLogin } from '../../stores/authSlice.js';
import loginSuccess from '../../stores/authSlice.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validate input fields
  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!validateInputs()) return;
  
    try {
      const resultAction = await dispatch(userLogin({ email, password }));
      if (userLogin.fulfilled.match(resultAction)) {
        toast.success('Đăng nhập thành công!');
        navigate('/home'); 
      } else if (userLogin.rejected.match(resultAction)) {
        toast.error(resultAction.payload || 'Đăng nhập thất bại!');
      }
    } catch (err) {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  };

  return (
    <Card variant="basic" sx={{ boxShadow: "none", display:"flex" }}>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      ></Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          justifyContent: "center",
          display: "flex",
        }}
        disabled={loading}
      >
        Đăng nhập
        {loading && '...'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSignIn}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
          error={!!emailError}
          helperText={emailError}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? '#A70F0F' : "#6FD181"}
          sx={{
            ariaLabel: "email",
            
          }}
          onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          </Box>
          <TextField
            error={!!passwordError}
            helperText={passwordError}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? '#A70F0F' : "#6FD181"}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              ariaLabel: "password",
              mb: 2,
            }}
          />
        </FormControl>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nhớ tôi"
          />
          <Link
            href="/forgotpassword"
            variant="body2"
            role="link"
            sx={{ cursor: "pointer" }}
          >
            Quên mật khẩu?
          </Link>
        </Box>

        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}

        <Button
          className="Button"
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSignIn} 
            disabled={loading} 
          sx={{
            height: "54px",
            my: 2,
          }}
        >
          {loading ? 'Đang đăng nhập...' : "Đăng nhập"}
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Chưa có tài khoản?{" "}
          <span>
            <Link href="/signup/" variant="body2" sx={{ alignSelf: "center" }}>
              Đăng ký
            </Link>
          </span>
        </Typography>
      </Box>

      <Divider>hoặc</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="outlined" 
          sx={
            {
             height:  "54px",
            }
          }
        >
          Đăng nhập với Google
        </Button>
      </Box>
    </Card>
  );
}

export default SignInCard;
