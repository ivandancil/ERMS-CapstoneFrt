import { AppBar, Toolbar, Button, Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [photo, setPhoto] = useState("");

    // Handle profile menu open
    function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
      setAnchorEl(event.currentTarget);
    }
    
    // Handle profile menu close
    function handleMenuClose() {
      setAnchorEl(null);
    }

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
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.warn("No token found, redirecting to login.");
        clearSessionAndRedirect();
        return;
      }
  
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.warn("Logout failed, proceeding with local cleanup.");
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    } finally {
      clearSessionAndRedirect();
    }
  }
  
  function clearSessionAndRedirect() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("photo"); 
    sessionStorage.clear();
  
    setIsLoggedIn(false);
    setRole(""); 
    setPhoto("");
  
    navigate("/login");
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
            <Box component="img" src="/image/depedLogo.png" alt="DepEd Logo" sx={{ height: 70, width: "auto", ml: 2 }} />

          {/* Nav Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

            {/* Conditional Buttons */}
            {isLoggedIn ? (
                <>
                {/* Profile Avatar with Margin */}
                <Tooltip title="Account settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 2, mr: 3 }}>
                    <Avatar src={photo || "/image/default-avatar.png"} sx={{ width: 45, height: 45 }} />
                  </IconButton>
                </Tooltip>

                {/* Dropdown Menu with Spacing */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{ mt: 1 }} 
                >
                  <MenuItem >
                    <Typography variant="body1" fontWeight="bold">
                      {userName}
                    </Typography>
                  </MenuItem>
                  <MenuItem sx={{ my: 1, px: 3 }} onClick={() => navigate(role === "admin" ? "/admin" : "/user")}>
                    Dashboard
                  </MenuItem>

                  <MenuItem sx={{ my: 1, px: 3 }} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
              ) : (
              <>
                {["Login", "Register"].map((text, index) => (
                  <NavLink key={index} to={`/${text.toLowerCase()}`} style={{ textDecoration: "none" }}>
                    {({ isActive }) => (
                      <Button
                        sx={{
                          mx: 1,
                          my: 1,
                          color: isActive ? "#1976d2" : "black",
                          fontSize: "1.1rem",
                          fontWeight: 600,
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
