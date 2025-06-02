import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Avatar, Box, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Logout } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { postLogOut } from "../utils/peticiones/postLogOut";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { toast } from "sonner";

export const AuthIcon = ({ scrolled }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, setLoading } = useContext(Context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navTo = (path) => {
    handleClose()
    navigate(path)
  }

  return (
    <>
      {user?.email ? (
        <>
          <Motion.div
            initial={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
            }}
            animate={{
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0)"
                : "rgba(255, 255, 255, 0.3)",
              backdropFilter: scrolled ? "none" : "blur(10px)",
              borderRadius: "0.5em",
              overflow: "hidden",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={handleClick}
          >
            <Tooltip title={`Mi cuenta - ${user.email}`} arrow>
              <AccountCircleIcon
                style={{
                  margin: ".5rem",
                  color: !scrolled ? "black" : "white",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Motion.div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            disableScrollLock
          >
            {user?.rol === "admin" ? (
                <MenuItem
                  onClick={() => navTo("/dashboard")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#b0976d",
                      color: "#fff",
                    },
                    color: "black",
                  }}
                >
                  <ListItemIcon>
                    <AnalyticsIcon sx={{ width: 20, height: 20 }} />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
            ) : (
              <Box>
                <MenuItem
                  onClick={() => navTo("/mi-perfil")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#b0976d",
                      color: "#fff",
                    },
                    color: "black",
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 20, height: 20 }} />
                  </ListItemIcon>
                  Mi Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => navTo("/mis-ordenes")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#b0976d", // color hover
                      color: "#fff",
                    },
                    color: "black", // color por defecto
                  }}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon sx={{ width: 20, height: 20 }} />
                  </ListItemIcon>
                  Mis compras
                </MenuItem>
              </Box>
            )}
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor: "#b0976d", // color hover
                  color: "#fff",
                },
                color: "black", // color por defecto
              }}
              onClick={() => {
                postLogOut(toast, setLoading)
                handleClose()
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link
          to="/inicio-sesion"
          style={{
            textDecoration: "none",
            color: !scrolled ? "black" : "white",
          }}
        >
          <Motion.div
            initial={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
            }}
            animate={{
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0)"
                : "rgba(255, 255, 255, 0.3)",
              backdropFilter: scrolled ? "none" : "blur(10px)",
              borderRadius: "0.5em",
              overflow: "hidden",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Tooltip title="Inicia Sesión o Registrate" arrow>
              <LoginIcon style={{ margin: ".5rem", cursor: "pointer" }} />
            </Tooltip>
          </Motion.div>
        </Link>
      )}
    </>
  );
};
