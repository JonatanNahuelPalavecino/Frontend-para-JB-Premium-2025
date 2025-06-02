import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar } from '@mui/material';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import InventoryIcon from '@mui/icons-material/Inventory';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export const SidebarDash = ({open, setOpen}) => {
    const navigate = useNavigate()

    const navTo = (path) => {
        setOpen(!open)
        navigate(path)
      }

      const navItems = [
        { 
          path: "/dashboard/", 
          name: "Inicio", 
          icon: () => (
            <HomeIcon/>
          )
        },
        { 
          path: "/dashboard/usuarios", 
          name: "Usuarios", 
          icon:  () => (
            <Avatar sx={{ width: 24, height: 24 }} />
          )
        },
        { 
          path: "/dashboard/ordenes", 
          name: "Ordenes", 
          icon: () => (
            <DescriptionIcon/>
          )
        },
        { 
          path: "/dashboard/transacciones", 
          name: "Transacciones", 
          icon: () => (
            <PaymentIcon/>
          )
        },
        { 
          path: "/dashboard/productos", 
          name: "Productos", 
          icon: () => (
            <InventoryIcon/>
          )
        },
        { 
          path: "/dashboard/metricas", 
          name: "Metricas", 
          icon: () => (
            <EqualizerIcon/>
          )
        },
      ];

    const DrawerList = (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
          role="presentation"
        >
          <List>
            {navItems.map((item, index) => (
              <ListItem 
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "#b0976d", // color hover
                    color: "#fff",
                  },
                  color: "black", // color por defecto
                }}
                disablePadding
              >
                <ListItemButton 
                  onClick={() => navTo(item.path)}
                >
                  <ListItemIcon sx={{minWidth: "40px"}}>{item.icon()}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    

    return (
        <Drawer 
          onClose={() => setOpen(!open)} 
          open={open} 
          anchor="left" 
          disableScrollLock
        >
            {DrawerList}
        </Drawer>
    )
}