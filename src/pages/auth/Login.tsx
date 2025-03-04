import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //Login Function
  
    async function handleLogin(event: React.FormEvent) {
      event.preventDefault(); 
      setError(""); 

      try {
          await fetch("http://localhost:8000/sanctum/csrf-cookie", {
              credentials: "include",
          });

          const response = await fetch("http://localhost:8000/api/login", {
              method: "POST",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
              throw new Error("Invalid credentials");
          }

          const data = await response.json();
          console.log("Login Success:", data);

          console.log("Redirecting to: ", data.user.role === "admin" ? "/admin" : "/user");
          navigate(data.user.role === "admin" ? "/admin" : "/user");
      } catch (err: any) {
          setError(err.message || "Login failed");
      }
  }

        
  return (
    <Box 
      sx={{ 
        height: "100vh",  
        width: "100vw",
        bgcolor: "white", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box 
        sx={{ 
          maxWidth: 400, 
          p: 3, 
          boxShadow: 3, 
          borderRadius: 2, 
          bgcolor: theme.palette.primary.main, 
          color: theme.palette.primary.contrastText, 
        }}
      >
        <Typography variant="h4" textAlign="center" mb={2}>Login</Typography>
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
           sx={{
             gridColumn: "span 2",
             "& .MuiInputLabel-root": {
               color: "white !important", 
             },
             "& .MuiInputLabel-root.Mui-focused": {
               color: "white !important", 
             },
             "& .MuiOutlinedInput-root": {
               "&:hover fieldset": {
                 borderColor: "white !important", 
               },
               "&.Mui-focused fieldset": {
                 borderColor: "white !important", 
               },
             },
             "& .MuiInputBase-input": {
               color: "white", 
             },
             "& .MuiFormHelperText-root": {
               color: "white", 
             },
           }}
          />
          <TextField
           variant="outlined"
           label="Password"
           type="password"
           fullWidth
           margin="normal"
           required
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           sx={{
             gridColumn: "span 2",
             "& .MuiInputLabel-root": {
               color: "white !important", 
             },
             "& .MuiInputLabel-root.Mui-focused": {
               color: "white !important", 
             },
             "& .MuiOutlinedInput-root": {
               "&:hover fieldset": {
                 borderColor: "white !important", 
               },
               "&.Mui-focused fieldset": {
                 borderColor: "white !important", 
               },
             },
             "& .MuiInputBase-input": {
               color: "white", 
             },
             "& .MuiFormHelperText-root": {
               color: "white", 
             },
           }}
          />
         <Button 
            type="submit" 
            variant="contained" 
            color="secondary" 
            fullWidth 
            sx={{ mt: 2 }}
            
           
          >
            Login
          </Button>
        </form>
        <Typography textAlign="center" mt={2}>
          Don't have an account?{" "}
            <Link to="/register" style={{ color: theme.palette.secondary.light, textDecoration: "none" }}>
              Register
            </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
