import { useContext, useEffect, useState } from "react";
import "./Dashboard.scss";
import { Context } from "../Context/Context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarDash } from "../SidebarDash/SidebarDash";
import MenuIcon from "@mui/icons-material/Menu";
import { verifyToken } from "../utils/validation/verifyToken";

export const Dashboard = () => {
  const { user, setUser } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar token cada vez que cambia la ruta
  useEffect(() => {
    const checkAuth = async () => {
      await verifyToken(setUser);
    };
    checkAuth();
  }, [location.pathname, setUser, navigate]);

  useEffect(() => {
    if (user?.rol !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="dashboard">
      <p className="dashboard-title">Dashboard</p>
      <nav className="dashboard-nav">
        <MenuIcon
          onClick={() => setOpen(!open)}
          sx={{ width: "30px", height: "30px", cursor: "pointer", margin: 1 }}
        />
      </nav>
      <SidebarDash open={open} setOpen={setOpen} />
      <div className="dashboard-container">
        <Outlet />
      </div>
    </main>
  );
};
