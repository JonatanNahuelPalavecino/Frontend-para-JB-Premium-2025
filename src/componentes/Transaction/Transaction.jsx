import { useState } from "react";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import "./Transaction.scss";
import {
  estadoDePago,
  obtenerDescripcion,
  obtenerTarjeta,
  obtenerTipoDeTarjeta,
} from "../utils/datos/pay";
import dayjs from "dayjs";

export const Transaction = ({ isLoading, error, transactions }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {isLoading ? (
        [...Array(10)].map((_, index) => (
          <div key={index} style={{ margin: ".5rem" }}>
            <SkeletonComponent width={"100%"} height={"100px"} />
          </div>
        ))
      ) : error ? (
        <li className="transaction-none">
          Hubo un error con el servidor. Intente mas tarde.
        </li>
      ) : Object.entries(transactions).length === 0 || !transactions ? (
        <li className="transaction-none">No hay transacciones encontradas</li>
      ) : (
        Object.entries(transactions).map(([orderId, txList]) => {
          const sortedTx = [...txList].sort(
            (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
          );
          const lastTx = sortedTx[0];
          const isExpanded = expanded[orderId];

          return (
            <li key={orderId} className="transaction">
              <div className="transaction-container">
                <div className="transaction-box">
                  <p className="transaction-title">Orden</p>
                  <p className="transaction-desc">{orderId}</p>
                </div>
                <div className="transaction-box">
                  <p className="transaction-title">Estado Actual</p>
                  <p className="transaction-desc">
                    {estadoDePago(lastTx.estado)}
                  </p>
                </div>
                <button
                  className="transaction-btn"
                  onClick={() => toggleExpand(orderId)}
                >
                  Ver Historial
                </button>
              </div>

              <div
                className={
                  isExpanded
                    ? "transaction-historial transaction-historial-expand"
                    : "transaction-historial"
                }
              >
                {sortedTx.map((tx) => {
                  const fecha = dayjs(tx.fecha_creacion).subtract(3, 'hour').format('DD/MM/YYYY - HH:mm');
                  return (
                    <div key={tx.id} className="transaction-item">
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">
                          Fecha de la Transacción:
                        </p>
                        <p className="transaction-itemDesc">{fecha}</p>
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">
                          Id de la Transacción:
                        </p>
                        <p className="transaction-itemDesc">
                          {tx.transaccionId}
                        </p>
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">Estado:</p>
                        <p className="transaction-itemDesc">
                          {estadoDePago(tx.estado)}
                        </p>
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">
                          Detalle del pago:
                        </p>
                        <p className="transaction-itemDesc">
                          {obtenerDescripcion(tx.detalleDelPago)}
                        </p>
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">Medio de Pago:</p>
                        <p className="transaction-itemDesc">
                          {obtenerTarjeta(tx.tarjeta)} -{" "}
                          {obtenerTipoDeTarjeta(tx.tipoDeTarjeta)}
                        </p>
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">Tipo de Moneda:</p>
                        {tx.moneda === "ARS" ? (
                          <p className="transaction-itemDesc">
                            Pesos Argentinos
                          </p>
                        ) : (
                          <p className="transaction-itemDesc">
                            Dolares Americanos
                          </p>
                        )}
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">Pago Bruto:</p>
                        {tx.moneda === "ARS" ? (
                          <p className="transaction-itemDesc">
                            AR${tx.pagoBruto.toLocaleString("es-ES")}
                          </p>
                        ) : (
                          <p className="transaction-itemDesc">
                            U$S{tx.pagoBruto.toLocaleString("es-ES")}
                          </p>
                        )}
                      </div>
                      <div className="transaction-itemBox">
                        <p className="transaction-itemTitle">Pago Recibido:</p>
                        {tx.moneda === "ARS" ? (
                          <p className="transaction-itemDesc">
                            AR${tx.pagoRecibido.toLocaleString("es-ES")}
                          </p>
                        ) : (
                          <p className="transaction-itemDesc">
                            U$S{tx.pagoRecibido.toLocaleString("es-ES")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })
      )}
    </>
  );
};
