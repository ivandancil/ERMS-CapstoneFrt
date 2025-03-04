import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 3, // Adds spacing between elements
      }}
    >
      {/* Project Title */}
      <Typography variant="h2" fontWeight="bold">
        DEVELOPMENT OF HUMAN RESOURCE INFORMATION SYSTEM <br/>
         IN DEPARTMENT OF EDUCATION <br/> TACLOBAN CITY DIVISION
      </Typography>


      {/* Buttons for Login & Register */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button component={Link} to="/login" variant="contained" color="secondary">
          Sign In
        </Button>
        <Button component={Link} to="/register" variant="outlined" color="secondary">
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
