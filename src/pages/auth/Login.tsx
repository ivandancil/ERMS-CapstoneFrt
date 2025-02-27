import { Box, TextField, Button, Typography, useTheme } from "@mui/material";



const Login = () => {
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
        <Typography variant="h4" textAlign="center" mb={2}>Login</Typography>
        <form>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            required
            InputLabelProps={{
              sx: {
                color: "white", 
                "&.Mui-focused": { color: "white" }, 
              },
            }}
            sx={{
              bgcolor: theme.palette.primary.dark, 
              borderRadius: 1,
              "&:focus-within": { bgcolor: "primary" }, 
            }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            required
            InputLabelProps={{
              sx: {
                color: "white", 
                "&.Mui-focused": { color: "white" }, 
              },
            }}
            sx={{
              bgcolor: theme.palette.primary.dark, 
              borderRadius: 1,
              "&:focus-within": { bgcolor: "primary" }, 
              input: { color: theme.palette.primary.contrastText }, 
            }}
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
