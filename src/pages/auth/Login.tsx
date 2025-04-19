import { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      if (!email || !password) {
        setError("Email and password are required.");
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      localStorage.clear();
      sessionStorage.clear();
      setUser(null);

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid server response.");
      }

      if (!response.ok) {
        setError(data.message || "Login failed.");
        setOpenSnackbar(true);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      // **Updated redirection logic**
      let redirectPath = "/user"; 
      if (data.user.role === "admin") {
        redirectPath = "/admin";
      }

      navigate(redirectPath);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.name === "AbortError" ? "Login request timed out. Please try again." : error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden", bgcolor: "black" }}>
      <Navbar />
      <Box
        component="img"
        src="/image/enhance.png"
        alt="DepEd Logo Background"
        sx={{
          position: "absolute",
          top: "90px",
          left: 0,
          width: "100%",
          height: "calc(100vh - 90px)",
          objectFit: "fill",
          opacity: 0.3,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box sx={{ height: "calc(100vh - 90px)", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            maxWidth: 400,
            width: "90%",
            p: 4,
            boxShadow: 5,
            borderRadius: 3,
            bgcolor: "rgba(255, 250, 250, 0.7)",
            color: theme.palette.text.primary,
            textAlign: "center",
            backdropFilter: "blur(3px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography variant="h3" textAlign="center" mb={2} fontWeight="bold" sx={{ textTransform: "uppercase", letterSpacing: 1, color: "black" }}>
            Login
          </Typography>
          <Typography variant="body1" textAlign="center" color="black" mb={2}>
            Please enter your credentials to log in to your account.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              sx={{
                "& .MuiInputLabel-root": { color: "black !important" },
                "& .MuiOutlinedInput-root fieldset": { borderColor: "black !important", borderWidth: 2 },
                "& .MuiInputBase-input": { color: "black" },
              }}
            />
           <TextField
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{
                "& .MuiInputLabel-root": { color: "black !important" },
                "& .MuiOutlinedInput-root fieldset": { borderColor: "black !important", borderWidth: 2 },
                "& .MuiInputBase-input": { color: "black" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "black" }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Typography textAlign="center" mt={2} color="black">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: theme.palette.primary.dark, fontWeight: "bold", textDecoration: "none" }}>
              Register
            </Link>
          </Typography>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Login;
