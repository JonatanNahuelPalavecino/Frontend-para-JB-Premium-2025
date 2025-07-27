import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import { Accesorios } from "../Accesorios/Accesorios";
import "./CartContainer.scss";
import { CartList } from "../CartList/CartList";
import { Tooltip } from "@mui/material";

export const CartContainer = () => {
  const { cart, totalCart, emptyCart, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.title =
      "Mi Carrito - JB Premium - Vinos Españoles - Distribuidor Oficial";
  }, []);

  const mostrarAccesorios =
    cart.length === 0 ||
    !cart.some(
      (producto) =>
        producto.nombre === "Caja Individual" ||
        producto.nombre === "Caja Doble"
    );

  return (
    <>
      <section className="cartContainer">
        <p className="cartContainer-title">MI CARRITO</p>
        <hr />
        <div className="cartContainer-container">
          <div className="cartContainer-box">
            {cart.length === 0 ? (
              <div className="cartContainer-empty">
                <p className="cartContainer-emptyText">
                  No hay productos en tu carrito
                </p>
                <Link to="/">
                  <button className="cartContainer-btn">
                    VOLVER AL INICIO
                  </button>
                </Link>
              </div>
            ) : (
              cart.map((prod) => <CartList key={prod.productoId} {...prod} />)
            )}
          </div>
          <div className="cartContainer-total">
            <em className="cartContainer-totalTitle">Resumen de mi compra:</em>
            <div className="cartContainer-totalBox">
              <p className="cartContainer-totalPrice">TOTAL: ${totalCart("ARS")}</p>
            </div>
            <div className="cartContainer-totalBtns">
              <button className="cartContainer-btn" onClick={emptyCart}>
                VACIAR CARRITO
              </button>
              <Tooltip
                title={
                  !user.userId
                    ? "Debes iniciar sesión para finalizar la compra."
                    : !(cart.length > 0) && "Debes agregar algun producto."
                }
                arrow
              >
                <span>
                    <button
                    disabled={!user.userId || !(cart.length > 0)}
                    onClick={() => navigate("/checkout")}
                    className="cartContainer-btn cartContainer-btnOtherColor"
                    >
                        FINALIZAR COMPRA
                    </button>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
      {mostrarAccesorios && (
        <section className="cartContainer">
          <p className="cartContainer-title">
            NO TE OLVIDES DE AGREGAR TU CAJA PARA LOS VINOS!
          </p>
          <Accesorios />
        </section>
      )}
    </>
  );
};
