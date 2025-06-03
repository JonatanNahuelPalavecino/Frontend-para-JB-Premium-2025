import React, { useContext, useEffect, useState } from "react";
import "./Producto.scss";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { toast } from "sonner";
import { ModalContainer } from "../ModalContainer/ModalContainer";

export const Producto = ({ producto, dolarOficial }) => {
  const precioFinal = Math.round(
    producto?.precio > 0 ? producto?.precio * dolarOficial : 0
  );
  const precioConDescuento = Math.round(
    producto?.precio > 0
      ? producto?.precio - producto?.precio * (producto?.porcDesc / 100)
      : 0
  );
  const precioFinalConDescuento = Math.round(
    precioFinal > 0 ? precioFinal - precioFinal * (producto?.porcDesc / 100) : 0
  );

  const [cantidad, setCantidad] = useState(0);
  const [open, setOpen] = useState(false);
  const { isInCart, addToCart } = useContext(Context);

  useEffect(() => {
    document.title = `${producto?.nombre} - JB Premium - Vinos Españoles - Distribuidor Oficial`;
  }, [producto?.nombre]);

  return (
    <>
      <div className="producto-container">
        <div className="producto-imgBox">
          {producto?.porcDesc > 0 && (
            <div className="producto-oferta">
              <p>{producto?.porcDesc} %</p>
              <p> OFF</p>
            </div>
          )}
          <img
            onClick={() => setOpen(true)}
            className="producto-img"
            src={producto?.foto}
            alt={producto?.nombre}
          />
        </div>
        <div className="producto-descripcion">
          <p className="producto-titulo">{producto?.nombre}</p>
          {producto?.cosecha && (
            <p className="producto-desc">
              <strong>Cosecha: </strong>
              {producto?.cosecha}
            </p>
          )}
          {producto?.bodega && (
            <p className="producto-desc">
              <strong>Bodega: </strong>
              {producto?.bodega}
            </p>
          )}
          {(producto?.nombre === "Caja Individual" ||
            producto?.nombre === "Caja Doble")  && (
            <p className="producto-desc producto-width">{producto?.descUno}</p>
          )}
          {producto?.precio !== 0 ? (
            <>
              {producto?.porcDesc > 0 ? (
                <>
                  <p className="producto-price producto-price-tachado">
                    {`U$S ${producto?.precio} BNA / AR$ ${precioFinal} c/u`}
                  </p>
                  <p className="producto-price">
                    {`U$S ${precioConDescuento} BNA / AR$ ${precioFinalConDescuento} c/u`}
                  </p>
                </>
              ) : (
                <p className="producto-price">
                  {`U$S ${producto?.precio} BNA / AR$ ${precioFinal} c/u`}
                </p>
              )}
            </>
          ) : (
            <p className="producto-price">Disponible Proximamente</p>
          )}
          {producto?.stock_disponible ? (
            <>
              <p className="producto-desc producto-stock">EN STOCK</p>
              <Link className="producto-desc producto-link" to="/detalle-envio">
                ENVÍOS 24/72hs
                <BsFillQuestionCircleFill className="producto-icon" />
              </Link>
            </>
          ) : (
            <p className="producto-desc producto-stock">SIN STOCK</p>
          )}
          <div className="producto-btns">
            {isInCart(producto?.productoId) ? (
              <>
                <Link
                  to="/carrito"
                  className="producto-btn producto-btnOtherColor"
                >
                  VER CARRITO
                </Link>
                <Link to="/productos" className="producto-btn">
                  CONTINUAR COMPRA
                </Link>
              </>
            ) : (
              <>
                {producto?.stock_disponible ? (
                  <>
                    <ItemCount
                      max={producto?.stock_disponible}
                      counter={cantidad}
                      setCounter={setCantidad}
                    />
                    <button
                      className="producto-btn"
                      onClick={() =>
                        addToCart(producto, cantidad, precioFinal, toast)
                      }
                    >
                      AGREGAR AL CARRITO
                    </button>
                    <Link to="/">
                      <button className="producto-btn producto-btnOtherColor">
                        VOLVER
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/">
                      <button className="producto-btn producto-btnOtherColor">
                        VOLVER
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ModalContainer open={open} onClose={() => setOpen(false)}>
        <img
        className="producto-modalImg"
          src={producto?.foto}
          alt={producto?.nombre}
        />
      </ModalContainer>
    </>
  );
};
