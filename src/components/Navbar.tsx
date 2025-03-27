import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(""); // NEW

  const [photo, setPhoto] = useState(""); // NEW

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");
  
  
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "Account");
      setRole(userRole || "");
     
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      fetch("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user info");
          return res.json();
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUserName(data.name);
      
  
          // Optional: update localStorage too
          localStorage.setItem("name", data.name);
          localStorage.setItem("role", data.role);
        })
        .catch((err) => {
          console.error(err.message);
          setIsLoggedIn(false);
        });
    }
  }, []);
  
  

  // Logout function
  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("photo"); // NEW
      setIsLoggedIn(false);
      setRole(""); // CLEAR role
      setPhoto(""); // NEW
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        height: 90,
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", minHeight: "90px" }}
      >
        {/* Logo */}
        <Box component="img" src="/image/depedLogo.png" alt="DepEd Logo" sx={{ height: 70, width: "auto", ml: 2 }} />

        {/* Nav Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Home link (always visible) */}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <Button
                sx={{
                  mx: 1,
                  color: isActive ? "#1976d2" : "black",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderBottom: isActive ? "2px solid #1976d2" : "none",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                    color: "#1976d2",
                  },
                }}
              >
                Home
              </Button>
            )}
          </NavLink>

          {/* Attendance link (only if admin) */}
          {role === "admin" && (
            <NavLink to="/attendance" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Button
                  sx={{
                    mx: 1,
                    color: isActive ? "#1976d2" : "black",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderBottom: isActive ? "2px solid #1976d2" : "none",
                    "&:hover": {
                      bgcolor: "#f0f0f0",
                      color: "#1976d2",
                    },
                  }}
                >
                  Attendance
                </Button>
              )}
            </NavLink>
          )}

          {/* Conditional Buttons */}
          {isLoggedIn ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {photo && (
                  <Box
                    component="img"
                    src={photo}
                    alt="Profile"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
              <Typography sx={{ mx: 2, fontWeight: 600, color: "black" }}>
                {userName}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ fontWeight: 600 }}
              >
                Logout
              </Button>
              </Box>
            </>
          ) : (
            <>
              {["Login", "Register"].map((text, index) => (
                <NavLink
                  key={index}
                  to={`/${text.toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <Button
                      sx={{
                        mx: 1,
                        color: isActive ? "#1976d2" : "black",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        borderBottom: isActive ? "2px solid #1976d2" : "none",
                        "&:hover": {
                          bgcolor: "#f0f0f0",
                          color: "#1976d2",
                        },
                      }}
                    >
                      {text}
                    </Button>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
