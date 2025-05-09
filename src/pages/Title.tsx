import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";

const Title = () => {
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const NAVBAR_HEIGHT = 90;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "black",
      }}
    >
      <Navbar />

      {/* Full Page Watermark */}
      <Box
        component="img"
        src="/image/enhance.png"
        alt="DepEd Logo Background"
        sx={{
          position: "absolute",
          top: `${NAVBAR_HEIGHT}px`,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          objectFit: "fill",
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Centered & Enlarged Logo */}
      <Box
        component="img"
        src="/image/Logo3.png"
        alt="DepEd Logo"
        sx={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isSmallScreen ? "250px" : "480px",
          height: "auto",
          zIndex: 1,
          opacity: 0.4,
        }}
      />

      {/* Title layered over logo */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
          px: 2,
          maxWidth: "90%",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="750"
          mt={4}
          sx={{
            lineHeight: 1.5,
            textTransform: "uppercase",
            color: "#fff",
            fontFamily: '"Poppins", "Arial", sans-serif',
            letterSpacing: "2px",
            textShadow:
              "3px 2px 6px rgba(0, 0, 0, 0.8), 0px 0px 12px rgba(0, 0, 0, 0.2)",
            wordBreak: "break-word",
           
            fontSize: {
              xs: "1.2rem", 
              sm: "1.6rem",
              md: "2rem",  
              lg: "2.5rem", 
              
            },
          }}
        >
          <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
          EMPLOYEE RECORD MANAGEMENT SYSTEM
         
          <br />
          WITH OPTICAL CHARACTER RECOGNITION
          <br />
          IN DEPARTMENT OF EDUCATION
          <br />
          TACLOBAN CITY DIVISION
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Title;
