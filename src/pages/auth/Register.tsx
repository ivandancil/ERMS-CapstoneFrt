import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
     const theme = useTheme();
     const navigate = useNavigate();
     
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");


     async function handleRegister(event: React.FormEvent) {
      event.preventDefault(); 
      setError(""); 

      try {
          const response = await fetch("http://localhost:8000/api/register", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, password }),
          });

          if (!response.ok) {
              throw new Error("Registration failed");
          }

          const data = await response.json();
          console.log("Registration Success:", data);

          localStorage.setItem("token", data.token);

          navigate(data.user.role === "admin" ? "/admin" : "/user");
      } catch (err: any) {
          setError(err.message || "Registration failed");
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
    <Typography variant="h4" textAlign="center" mb={2}>Register</Typography>
    <form onSubmit={handleRegister} >
      <TextField
      variant="outlined"
        label="Full Name"
        name="name"
        fullWidth
        margin="normal"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        label="Email"
        name="email"
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
        name="password"
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
      
      
        <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </form>
    <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
            <Link to="/login" style={{ color: theme.palette.secondary.light, textDecoration: "none" }}>
              Login
            </Link>
        </Typography>
  </Box>
  </Box>
  )
}

export default Register