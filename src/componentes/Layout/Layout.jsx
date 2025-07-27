import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../Home/Home";
import { ProductoContainer } from "../ProductoContainer/ProductoContainer";
import { ProductosContainer } from "../ProductosContainer/ProductosContainer";
import { CartContainer } from "../CartContainer/CartContainer";
import { Nosotros } from "../Nosotros/Nosotros";
import { Auth } from "../Auth/Auth";
import { Context } from "../Context/Context";
import { verifyToken } from "../utils/validation/verifyToken";
import { postVisit } from "../utils/peticiones/postVisit";
import { ResetPass } from "../ResetPass/ResetPass";
import { Profile } from "../Profile/Profile";
import { Orders } from "../Orders/Orders";
import { Checkout } from "../Checkout/Checkout";
import { NotFound } from "../NotFound/NotFound";
import { PaySuccess } from "../PayState/PaySuccess";
import { PayFailure } from "../PayState/PayFailure";
import { PayPending } from "../PayState/PayPending";
import { Faq } from "../Faq/Faq";
import { DetailEnvio } from "../DetailEnvio/DetailEnvio";
import { DetailVenta } from "../DetailVenta/DetailVenta";
import { Dashboard } from "../Dashboard/Dashboard";
import { LegalPage } from "../LegalPage/LegalPage";
import { HomeDash } from "../HomeDash/HomeDash";
import { UsersDash } from "../UsersDash/UsersDash";
import { OrdersDash } from "../OrdersDash/OrdersDash";
import { TransactionDash } from "../TransactionsDash/TransactionDash";
import { ProductosDash } from "../ProductosDash/ProductosDash";
import { ProductEditDash } from "../ProductEditDash/ProductEditDash";
import { ProductCreateDash } from "../ProductCreateDash/ProductCreateDash";
import { MetricasDash } from "../MetricasDash/MetricasDash";

export const Layout = () => {
  const { setUser, user } = useContext(Context);
  const url = import.meta.env.VITE_SERVER;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const checkAuth = async () => {
      await verifyToken(setUser);
    };
    checkAuth();

    const registerVisit = async () => {
      await postVisit(url, location.pathname, user);
    };
    
    if (user?.rol !== "admin") {
      registerVisit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:productoId" element={<ProductoContainer />} />
        <Route path="/productos" element={<ProductosContainer />} />
        <Route path="/carrito" element={<CartContainer />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/inicio-sesion" element={<Auth type={"auth"} />} />
        <Route path="/registro-usuario" element={<Auth type={"register"} />} />
        <Route
          path="/cambiar-password"
          element={<ResetPass type={"cambiar-password"} />}
        />
        <Route
          path="/restablecer-password"
          element={<ResetPass type={"restablecer-password"} />}
        />
        <Route path="/mi-perfil" element={<Profile />} />
        <Route path="/mis-ordenes" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pago-realizado" element={<PaySuccess />} />
        <Route path="/pago-rechazado" element={<PayFailure />} />
        <Route path="/pago-pendiente" element={<PayPending />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
        <Route path="/detalle-envio" element={<DetailEnvio />} />
        <Route path="/detalle-venta" element={<DetailVenta />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<HomeDash />} />
          <Route path="usuarios" element={<UsersDash />} />
          <Route path="ordenes" element={<OrdersDash />} />
          <Route path="transacciones" element={<TransactionDash />} />
          <Route path="productos" element={<ProductosDash />} />
          <Route
            path="editar-producto/:productoId"
            element={<ProductEditDash />}
          />
          <Route path="crear-producto" element={<ProductCreateDash />} />
          <Route path="metricas" element={<MetricasDash />} />
        </Route>
        <Route path="/terminos-condiciones" element={<LegalPage />} />
      </Routes>
    </>
  );
};
