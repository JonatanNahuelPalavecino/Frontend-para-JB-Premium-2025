import { toast } from "sonner";
import { deleteOrder } from "../utils/peticiones/deleteOrder";
import "./OrderItem.scss";
import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderItem = ({
  codigoPostal,
  direccion,
  moneda,
  estado,
  fecha_creacion,
  items,
  localidad,
  orderId,
  provincia,
  telefono,
  total,
  nombre,
  apellido,
  email,
  link_pago,
  setReload,
  type
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false)
  const { setLoading, setCart, setOrder } = useContext(Context);

  const fecha = new Date(fecha_creacion).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  });

  const copyOrder = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("N° de orden copiado en el portapapeles.");
  };

  const handleDelete =  () => {
    deleteOrder(orderId, setLoading)
      .then(() => setReload((prev) => !prev))
  }

  const handleModify = () => {
    setCart(items)
    setOrder({
      telefono,
      direccion,
      localidad,
      codigoPostal,
      orderId
    })
    toast.success("Orden habilitada para su modificación.")
    navigate("/carrito")
  }

  return (
    <>
      <div className="order">
        <div className="order-container">
          <div className="order-scroll">
            <div className="order-box">
              <p className="order-title">
                N° de Orden
                <button className="order-copy" onClick={copyOrder}>
                  📋
                </button>
              </p>
              <p className="order-desc">{orderId}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Estado de la orden</p>
              <p className="order-desc">
                {estado === "pending" 
                  ? "Pago no realizado ❌"
                  : estado === "in_process"
                  ? "Pendiente de Pago ⌛"
                  : estado === "rejected"
                  ? "Pago Rechazado ❌"
                  : "Pago Aprobado ✅"}
              </p>
            </div>
            <div className="order-box">
              <p className="order-title">Solicitado por</p>
              <p className="order-desc">{`${nombre} ${apellido}`}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Email</p>
              <p className="order-desc">{email}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Telefono</p>
              <p className="order-desc">{telefono ? telefono : "No hay datos"}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Direccion</p>
              <p className="order-desc">{direccion}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Localidad</p>
              <p className="order-desc">{localidad}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Provincia</p>
              <p className="order-desc">{provincia}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Codigo Postal</p>
              <p className="order-desc">{codigoPostal}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Total</p>
              <p className="order-desc">{moneda === "ARS" ? "AR$" : "U$S"} {total}</p>
            </div>
            <div className="order-box">
              <p className="order-title">Creado el</p>
              <p className="order-desc">{fecha}</p>
            </div>
          </div>
          <button className="order-btn" onClick={() => setExpand(!expand)}>Ver Items</button>
          {
            type === "user" ? (
              <>
                <Tooltip title={estado === "approved" && "No podes pagar una orden ya abonada."} arrow>      
                  <span>          
                    <a
                      className={
                        estado === "approved" ? "order-btn order-disabled" : "order-btn"
                      }
                      href={estado === "approved" ? undefined : link_pago}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pagar
                    </a>
                  </span>    
                </Tooltip>
                <Tooltip title={estado === "approved" && "No podes modificar una orden ya abonada."} arrow>   
                  <span>          
                    <button 
                      className="order-btn order-btnOtherColor" 
                      disabled={estado === "approved"}
                      onClick={handleModify}
                    >
                      Modificar
                    </button>
                  </span>       
                </Tooltip>
                <Tooltip title={estado === "approved" && "No podes eliminar una orden abonada."} arrow>      
                  <span>          
                    <button
                      className="order-btn order-btnDelete"
                      disabled={estado === "approved"}
                      onClick={() => setOpen(true)}
                    >
                      Eliminar
                    </button>
                  </span>    
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title={estado === "approved" && "No podes eliminar una orden abonada."} arrow>      
                  <span>          
                    <button
                      className="order-btn order-btnDelete"
                      disabled={estado === "approved"}
                      onClick={() => setOpen(true)}
                    >
                      Eliminar
                    </button>
                  </span>    
                </Tooltip>
              </>
            )
          }
        </div>
        <div className={expand ? "order-items order-items-expand" : "order-items"}>
          {
            items?.map((item) => (
              <div key={item.productoId} className="order-items-container">
                <div className="order-items-boxImg">
                  <img className="order-items-img" src={item.foto} alt={item.nombre} />
                </div>
                <p className="order-items-desc"><strong>Producto:</strong> {item.nombre}</p>
                <p className="order-items-desc"><strong>Precio:</strong> {moneda === "ARS" ? `AR$ ${item.precioEnPesos}` : `U$S ${item.precio}`}</p>
                <p className="order-items-desc"><strong>Cantidad:</strong> {item.cantidad}</p>
              </div>
            ))
          }
        </div>
      </div>
      <ModalContainer open={open} onClose={() => setOpen(false)}>
        <div className="order-modal">
          <p className="order-title">
            ¿Estás seguro que querés eliminar la orden <b>{orderId}</b>?
          </p>
          <div className="order-modalBtns">
            <button onClick={() => setOpen(false)} className="order-btn">
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="order-btn order-btnOtherColor"
            >
              Eliminar
            </button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};