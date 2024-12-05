import * as React from "react";
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
  //     const [emailError, setEmailError] = React.useState(false);
  //   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  //   const [passwordError, setPasswordError] = React.useState(false);
  //   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  //   const [open, setOpen] = React.useState(false);
  //   const [email, setEmail] = React.useState('');
  //   const [password, setPassword] = React.useState('');
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { loading } = useSelector((state) => state.auth);

  //   const signInWithGoogle = () => {
  //     window.open(`${API_BASE_URL}/auth/google`, '_self');
  //   };

  //   const handleSignIn = (e) => {
  //     e.preventDefault();
  //     if (!validateInputs()) return;

  //     dispatch(userLogin({ email, password }))
  //       .unwrap()
  //       .then((response) => {
  //         if (response) {
  //           toast.success('Đăng nhập thành công');
  //           navigate('/');
  //         }
  //       })
  //       .catch((status) => {
  //         if (status === 401) {
  //           toast.error('Sai tài khoản hoặc mật khẩu');
  //         } else {
  //           toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
  //         }
  //       });
  //   };

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     });
  //   };

  //   const validateInputs = () => {
  //     let isValid = true;

  //     if (!email || !/\S+@\S+\.\S+/.test(email)) {
  //       setEmailError(true);
  //       setEmailErrorMessage('Vui lòng điền đúng địa chỉ email.');
  //       isValid = false;
  //     } else {
  //       setEmailError(false);
  //       setEmailErrorMessage('');
  //     }

  //     if (!password || password.length < 6) {
  //       setPasswordError(true);
  //       setPasswordErrorMessage('Mật khẩu phải chứa ít nhất 6 ký tự.');
  //       isValid = false;
  //     } else {
  //       setPasswordError(false);
  //       setPasswordErrorMessage('');
  //     }

  //     return isValid;
  //   };

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
        /* disabled={loading} */
      >
        Đăng ký
        {/* {loading && '...'} */}
      </Typography>
      <Box
        component="form"
        /* onSubmit={handleSubmit} */
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
          /* error={emailError}
                helperText={emailErrorMessage} */

          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          // fullWidth
          // variant="outlined"
          // color={/* emailError ? 'error' : */ "primary"}
          sx={{
            ariaLabel: "email",
            
          }}
          /* onChange={(e) => setEmail(e.target.value)} */
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
            /* error={passwordError}
                helperText={passwordErrorMessage} */
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={/* passwordError ? 'error' :  */ "primary"}
            /* onChange={(e) => setPassword(e.target.value)} */
            sx={{
              ariaLabel: "password",
              mb: 2,
            }}
          />
        </FormControl>

        <FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormLabel htmlFor="password">Nhập lại mật khẩu</FormLabel>
          </Box>
          <TextField
            /* error={passwordError}
                helperText={passwordErrorMessage} */
            name="passwordReEnter"
            placeholder="••••••"
            type="password"
            id="passwordReEnter"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={/* passwordError ? 'error' :  */ "primary"}
            /* onChange={(e) => setPassword(e.target.value)} */
            sx={{
              ariaLabel: "password",
              mb: 2,
            }}
          />
        </FormControl>


        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}

        <Button
          className="Button"
          type="submit"
          fullWidth
          variant="contained"
          /* onClick={handleSignIn} 
              disabled={loading}  */
          sx={{
            height: "54px",
            my: 2,
          }}
        >
          {/* loading ? 'Đang đăng ký...' :  */ "Đăng ký"}
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <span>
            <Link href="/signin/" variant="body2" sx={{ alignSelf: "center" }}>
              Đăng nhập
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}

export default SignUpCard;