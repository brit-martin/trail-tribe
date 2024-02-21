import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector,useDispatch } from "react-redux";
import { primHoverSX, secHoverSX } from "./Theme";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import axios from "axios";

// const unAuthPages = ["About", "FAQ", "Contact"];
// const AuthPages = ["About", "FAQ", "Contact", "News Feed", "Explore"];
// const authSettings = ["Profile", "Account", "Dashboard", "Logout"];
// const unAuthSettings = ["Login", "Signup"];

function NavBar() {
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navButtonStyle = {
    textDecoration: "none",
    color: "white",
    my: 2,
    display: "block",

  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleAbout() {
    navigate("/about");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleFAQ() {
    navigate("/faq");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleContact() {
    navigate("/contact");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleNewsFeed() {
    navigate("/newsfeed");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleExplore() {
    navigate("/explore");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleSignUp() {
    navigate("/signup");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleLogin() {
    navigate("/login");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  function handleEditInfo() {
    navigate("/edit-info");
    setAnchorElUser(null);
    setAnchorElNav(null);
  }

  async function handleLogout() {
    try {
      const response = await axios.delete("/logout");
      console.log("Logout response:", response);
      dispatch({ type: "RESET_USER" });
      navigate("/");
      setAnchorElUser(null);
      setAnchorElNav(null);
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle the error as needed
    }
  }
  
  

  return (
    <AppBar position="static" color="tertiary">
      <Container maxWidth="xl">
        <Toolbar disablegutters='true'>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Permanent Marker, cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TrailTribe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {reduxUser.id ? (
                <div>
                  <MenuItem key="About" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/about">
                      <Typography textAlign="center">About</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="FAQ" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/faq">
                      <Typography textAlign="center">FAQ</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="Contact" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/contact">
                      <Typography textAlign="center">Contact</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="News" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/newsfeed">
                      <Typography textAlign="center">News Feed</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="Explore" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/explore">
                      <Typography textAlign="center">Explore</Typography>
                    </NavLink>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem key="About" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/about">
                      <Typography textAlign="center" href="/about">
                        About
                      </Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="FAQ" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="faq">
                      <Typography textAlign="center">FAQ</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="Contact" onClick={handleCloseNavMenu}>
                    <NavLink className="nav" to="/contact">
                      <Typography textAlign="center">Contact</Typography>
                    </NavLink>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Permanent Marker, cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TrailTribe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {reduxUser.id ? (
              <>
                <Button
                  key="About"
                  onClick={handleAbout}
                  style={navButtonStyle}
                >
                  About
                </Button>
                <Button
                  key="FAQ"
                  onClick={handleFAQ}
                  style={navButtonStyle}
                >
                  FAQ
                </Button>
                <Button
                  key="Contact"
                  onClick={handleContact}
                  style={navButtonStyle}
                >
                  Contact
                </Button>
                <Button
                  key="News"
                  onClick={handleNewsFeed}
                  style={navButtonStyle}
                >
                  News Feed
                </Button>
                <Button
                  key="Explore"
                  onClick={handleExplore}
                  style={navButtonStyle}
                >
                  Explore
                </Button>
              </>
            ) : (
              <>
                <Button
                  key="About"
                  onClick={handleAbout}
                  style={navButtonStyle}
                >
                  About
                </Button>
                <Button
                  key="FAQ"
                  onClick={handleFAQ}
                  style={navButtonStyle}
                >
                  FAQ
                </Button>
                <Button
                  key="Contact"
                  onClick={handleContact}
                  style={navButtonStyle}
                >
                  Contact
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {reduxUser.id ? (
              <div>
                <Tooltip title="Open Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                    <NavLink className="nav" to="/edit-info">
                      <Typography textAlign="center">Profile</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button
                  key="Login"
                  onClick={handleLogin}
                  sx={primHoverSX}
                  color="secondary"
                >
                  Login
                </Button>
                <Button key="Signup" onClick={handleSignUp} sx={secHoverSX}>
                  Sign Up
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
