import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
     const theme = useTheme();
     


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
    <form >
      <TextField
      variant="outlined"
        label="Full Name"
        name="name"
        fullWidth
        margin="normal"
        required
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