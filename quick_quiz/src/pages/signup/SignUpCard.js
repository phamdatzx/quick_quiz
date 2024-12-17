import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../stores/authSlice";

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

const SignUpCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let isValid = true;
  
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      isValid = false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Vui lòng nhập email hợp lệ!");
      isValid = false;
    } else {
      setEmailError("");
    }
  
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/; // Ít nhất 6 ký tự, gồm chữ cái và số
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ cái và số!"
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp!");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    return isValid;
  };
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const resultAction = await dispatch(
        userRegister({ name, email, password })
      );
      if (userRegister.fulfilled.match(resultAction)) {
        toast.success("Đăng ký thành công!");
        navigate("/SignIn");
      } else {
        toast.error(resultAction.payload || "Đăng ký thất bại!");
      }
    } catch {
      toast.error(error || "Đã có lỗi xảy ra!");
    }
  };

  return (
    <Card>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: "center", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Đăng ký
      </Typography>
      <Box
        component="form"
        onSubmit={handleSignUp}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Họ Tên */}
        <FormControl>
          <FormLabel htmlFor="name">Họ Tên</FormLabel>
          <TextField
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            fullWidth
            required
            variant="outlined"
          />
        </FormControl>

        {/* Email */}
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="your@email.com"
            fullWidth
            required
            variant="outlined"
            error={!!emailError}
            helperText={emailError}
          />
        </FormControl>

        {/* Mật khẩu */}
        <FormControl>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <TextField
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="••••••"
            type="password"
            fullWidth
            required
            variant="outlined"
            error={!!passwordError}
          />
        </FormControl>

        {/* Nhập lại mật khẩu */}
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Nhập lại mật khẩu</FormLabel>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="••••••"
            type="password"
            fullWidth
            required
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
          />
        </FormControl>

        {/* Nút đăng ký */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ height: "54px", mt: 2 }}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <Link href="/signin" variant="body2">
            Đăng nhập
          </Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default SignUpCard;
