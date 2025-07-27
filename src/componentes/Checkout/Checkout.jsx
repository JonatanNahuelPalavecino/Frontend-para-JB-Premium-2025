import "./Checkout.scss";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Context/Context";
import useForm from "../Hooks/useForm";
import { localidades } from "../utils/datos/localidad";
import { Link, useNavigate } from "react-router-dom";
import { verifyForm } from "../utils/validation/verifyForm";
import { postOrder } from "../utils/peticiones/postOrder";
import { toast } from "sonner";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { putOrder } from "../utils/peticiones/putOrder";
import { MercadoPago } from "../utils/icons/MercadoPago";
import { PayPal } from "../utils/icons/PayPal";

export const Checkout = () => {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const { user, cart, setCart, totalCart, setLoading, order, setOrder } =
    useContext(Context);
  const [open, setOpen] = useState(false);
  const [metodoPago, setMetodoPago] = useState("mercado_pago");
  const [link, setLink] = useState(null);
  const [err, setErr] = useState();
  const VITE_FRONTEND = import.meta.env.VITE_FRONTEND;
  const initialState = {
    nombre: user?.nombre,
    apellido: user?.apellido,
    email: user?.email,
    telefono: order?.telefono || "",
    direccion: order?.direccion || "",
    localidad: order?.localidad || "",
    codigoPostal: order?.codigoPostal || "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState);
  const {
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    localidad,
    codigoPostal,
  } = state;

  useEffect(() => {
    document.title =
      "Detalles de Facturación - JB Premium - Vinos Españoles - Distribuidor Oficial";

    if (!user.userId) {
      return navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!link || !open) return;

    const interval = setInterval(() => {
      if (!iframeRef) return;

      try {
        const currentUrl = iframeRef.current?.contentWindow?.location.href;
        if (currentUrl?.includes(VITE_FRONTEND)) {
          const urlObject = new URL(currentUrl);
          const path = urlObject.pathname;

          clearInterval(interval);

          if (path.includes("pago-realizado")) {
            toast.success("Pago realizado de forma exitosa.");
            navigate("/pago-realizado");
          } else if (path.includes("pago-rechazado")) {
            toast.error("Pago rechazado.");
            navigate("/pago-rechazado");
          } else if (path.includes("pago-pendiente")) {
            toast.warning("Pago pendiente.");
            navigate("/pago-pendiente");
          } else {
            navigate("/mis-ordenes");
          }
        }
      } catch (err) {
        console.log("Error en Checkout.js - Linea 87", err);
        // No hacemos nada. Esto puede pasar por seguridad entre dominios.
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, open, VITE_FRONTEND]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificarForm = verifyForm(state, "checkout");

    if (verificarForm.estado === "error") {
      setErr(verificarForm.error);
      return;
    }

    setErr();
    onResetForm();

    let data;

    if (order?.orderId) {
      data = await putOrder(
        order?.orderId,
        verificarForm.values,
        cart,
        metodoPago,
        setLoading
      );
    } else {
      data = await postOrder(
        verificarForm.values,
        user.userId,
        cart,
        metodoPago,
        setLoading
      );
    }

    if (data.estado === "error") {
      toast.error(data.mensaje);
      return;
    } else if (data.message === "Failed to fetch") {
      toast.warning("Hubo un error con el servidor. Intente más tarde.");
      return;
    }

    setOrder({});
    setCart([]);
    toast.success(data.mensaje);
    setLink(data.link);
    setOpen(true);
  };

  return (
    <>
      <section className="checkout">
        <p className="checkout-title">DETALLES DE FACTURACIÓN Y ENVÍO</p>
        <hr />
        <p className="checkout-mandatoy">
          * <em className="checkout-text">Datos obligatorios</em>
        </p>
        <div className="checkout-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-section">
              <em className="checkout-text">Datos Personales</em>
              <div className="checkout-sectionRow">
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="nombre">
                    Nombre <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={onInputChange}
                    name="nombre"
                    id="nombre"
                  />
                  <p className="checkout-error">{err ? err.nombre : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="apellido">
                    Apellido <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese su apellido"
                    value={apellido}
                    onChange={onInputChange}
                    name="apellido"
                  />
                  <p className="checkout-error">{err ? err.apellido : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="email">
                    Email <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={onInputChange}
                    name="email"
                    id="email"
                  />
                  <p className="checkout-error">{err ? err.email : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="telefono">
                    Telefono <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese su telefono"
                    value={telefono}
                    onChange={onInputChange}
                    name="telefono"
                  />
                  <p className="checkout-error">{err ? err.telefono : ""}</p>
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <em className="checkout-text">Datos para el envío</em>

              <div className="checkout-sectionRow">
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="direccion">
                    Dirección <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese calle y numero"
                    value={direccion}
                    onChange={onInputChange}
                    name="direccion"
                  />
                  <p className="checkout-error">{err ? err.direccion : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="localidad">
                    Localidad <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese su localidad"
                    value={localidad}
                    onChange={onInputChange}
                    name="localidad"
                    id="localidad"
                  />
                  <p className="checkout-error">{err ? err.localidad : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="provincia">
                    Provincia <i className="checkout-mandatory">*</i>
                  </label>
                  <select
                    className="checkout-input"
                    placeholder="Elige una opción"
                    name="provincia"
                    id="provincia"
                    onChange={onInputChange}
                  >
                    {localidades.map((localidad) => (
                      <option
                        key={localidad.key}
                        className="checkout-label"
                        value={localidad.value}
                      >
                        {localidad.value === ""
                          ? "Elige una opción"
                          : localidad.value}
                      </option>
                    ))}
                  </select>
                  <p className="checkout-error">{err ? err.provincia : ""}</p>
                </div>
                <div className="checkout-box">
                  <label className="checkout-label" htmlFor="codigoPostal">
                    Codigo Postal <i className="checkout-mandatory">*</i>
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Ingrese su codigo postal"
                    value={codigoPostal}
                    onChange={onInputChange}
                    name="codigoPostal"
                    id="codigoPostal"
                  />
                  <p className="checkout-error">
                    {err ? err.codigoPostal : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <em className="checkout-text">Método de Pago</em>
              <div className="checkout-sectionCheck">
                <div className="checkout-boxCheck">
                  <span>Pagar con Mercado Pago</span>
                  <MercadoPago />
                  <label className="checkout-labelCheck">
                    <input
                      className="checkout-inputCheck"
                      type="radio"
                      name="metodo_pago"
                      value="mercado_pago"
                      checked={metodoPago === "mercado_pago"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <div className="checkout-transition"></div>
                  </label>
                </div>
                <div className="checkout-boxCheck">
                  <span>Pagar con Pay Pal</span>
                  <PayPal />
                  <label className="checkout-labelCheck">
                    <input
                      className="checkout-inputCheck"
                      type="radio"
                      name="metodo_pago"
                      value="pay_pal"
                      checked={metodoPago === "pay_pal"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <div className="checkout-transition"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="checkout-btns">
              <Link to="/carrito">
                <button className="checkout-btn">VOLVER</button>
              </Link>
              <button
                className="checkout-btn checkout-btnOtherColor"
                type="submit"
              >
                {order?.orderId ? "MODIFICAR Y PAGAR" : "PAGAR"}
              </button>
            </div>
          </form>
          <div className="checkout-total">
            <em className="checkout-totalTitle">Resumen de mi compra:</em>
            {cart.map((product) => (
              <div className="checkout-totalBox" key={product.productoId}>
                <img
                  className="checkout-totalImg"
                  src={product.foto}
                  alt={product.nombre}
                />
                <p className="checkout-totalText">
                  {`${product.nombre} - x ${product.cantidad} un - ${
                    metodoPago === "pay_pal"
                      ? `U$S ${product.precio}`
                      : `AR$ ${product.precioEnPesos}`
                  }.- c/u`}
                </p>
              </div>
            ))}
            <p className="checkout-totalPrice">
              TOTAL: {metodoPago === "mercado_pago" ? "AR$ " : "U$S "}
              {totalCart(metodoPago === "mercado_pago" ? "ARS" : "USD").toLocaleString("es-AR")}
            </p>
            <div className="checkout-totalBtns">
              <Link className="checkout-totalBtn" to="/productos">
                CONTINUAR COMPRA
              </Link>
            </div>
          </div>
        </div>
        <div className="checkout-info">
          <div className="checkout-infoBoxIcon">
            <AiFillExclamationCircle className="checkout-infoIcon" />
          </div>
          <div className="checkout-infoDesc">
            <em className="checkout-infoText">
              El envío es gratuito para todo CABA para compras mayores de
              AR$20.000. Para mas info
              <Link className="checkout-infoDetail" to="/detalle-envio">
                click aquí{" "}
                <BsFillQuestionCircleFill className="icon-question" />
              </Link>
            </em>
            <em className="checkout-infoText">
              Los datos cargados en este formulario son de uso exclusivo para el
              envío de la compra y su facturacion. Los mismos nunca seran
              compartidos fuera de lo mencionado por JB Premium.
            </em>
          </div>
        </div>
      </section>
      <ModalContainer
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/mis-ordenes");
          toast.warning(
            "Salio de la pantalla de pago. Retome el mismo en mis ordenes."
          );
        }}
      >
        <iframe
          ref={iframeRef}
          src={link}
          className="checkout-link"
          style={{ border: "none" }}
        />
      </ModalContainer>
    </>
  );
};
