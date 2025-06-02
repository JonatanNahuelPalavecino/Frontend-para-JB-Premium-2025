import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion as Motion } from "framer-motion";
import { HideOnScroll } from "./HideOnScroll";
import { useNavbarScroll } from "../Hooks/useNavbarScroll";
import "./NavBar.scss";
import { AuthIcon } from "../AuthIcon/AuthIcon";
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from "../Sidebar/Sidebar";
import WineBarIcon from '@mui/icons-material/WineBar';
import HomeIcon from '@mui/icons-material/Home';
import CommentIcon from '@mui/icons-material/Comment';

export const NavBar = (props) => {
  const [open, setOpen] = useState(false)
  const { cart } = useContext(Context);
  const scrolled = useNavbarScroll(100);

  const navItems = [
    { 
      path: "/", 
      name: "Inicio", 
      icon: () => (
        <HomeIcon/>
      )
    },
    { 
      path: "/nosotros", 
      name: "Nosotros", 
      icon: () => (
        <CommentIcon/>
      )
    },
    { 
      path: "/productos", 
      name: "Productos", 
      icon:  () => (
        <WineBarIcon/>
      )
    },
    { 
      path: "/carrito", 
      name: "Mi Carrito", 
      icon:  () => (
        <Badge
          sx={{ mx: 0.5 }}
          color="error"
          badgeContent={cart.length}
        >
          <ShoppingCartIcon />
        </Badge>
      )
    },
  ];

  return (
    <>
      <HideOnScroll {...props}>
        <Motion.div
          initial={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            boxShadow: "none",
          }}
          animate={{
            backgroundColor: scrolled
              ? "rgb(0, 0, 0)"
              : "rgba(255, 255, 255, 0)",
            boxShadow: scrolled
              ? "0 0 1em 0.25em #121212, 0 0 rgb(0 0 0), 0 0 0.75em 0.25em rgb(255 255 255)"
              : "none",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="nav"
        >
          {scrolled && (
            <div className="nav-bandera">
              <div className="nav-banderaContent">
                <div className="nav-lineaRoja"></div>
                <div className="nav-lineaAmarilla"></div>
                <div className="nav-lineaRoja"></div>
              </div>
            </div>
          )}
          <div className="nav-content">
            <div className="nav-logo">
              <Link to="/">
                <img
                  className="nav-img"
                  src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1742325732/uploads/logo.png"
                  alt="logo"
                />
              </Link>
              <Motion.p
                initial={{ color: "rgb(0, 0, 0)" }}
                animate={{
                  color: scrolled ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="nav-text"
              >
                VINOS ESPAÑOLES
              </Motion.p>
            </div>
            <nav className="nav-enlace">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{ textDecoration: "none" }}
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
                    <Motion.p
                      initial={{ color: "rgb(0, 0, 0)" }}
                      animate={{
                        color: scrolled ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                      }}
                      whileHover={{
                        color: scrolled ? "#b0976d" : "#A60000",
                        transition: { duration: 0.1, ease: "easeInOut" },
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="nav-item"
                    >
                      {item.name === "Mi Carrito" ? (
                        <>
                          {item.name}
                          <Badge
                            sx={{ mx: 0.5 }}
                            color="error"
                            badgeContent={cart.length}
                          >
                            <ShoppingCartIcon />
                          </Badge>
                        </>
                      ) : (
                        item.name
                      )}
                    </Motion.p>
                  </Motion.div>
                </Link>
              ))}
              <AuthIcon scrolled={scrolled}/>
            </nav>
            <div className="nav-burger">
              <MenuIcon onClick={() => setOpen(!open)} sx={{color: scrolled ?"white" : "black", width: "30px", height: "30px", cursor: "pointer"}}/>
            </div>
            <Sidebar open={open} setOpen={setOpen} navItems={navItems}/>
          </div>
        </Motion.div>
      </HideOnScroll>
    </>
  );
};
