import { useContext, useEffect, useState } from "react";
import "./OrdersDash.scss";
import { getOrdersById } from "../utils/peticiones/getOrders";
import { OrderItem } from "../OrderItem/OrderItem";
import { Context } from "../Context/Context";
import useForm from "../Hooks/useForm";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";

export const OrdersDash = () => {
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(Context);
  const initialState = {
    orderId: "",
    estado: "",
    userId: "",
    telefono: "",
    localidad: "",
    provincia: "",
    codigoPostal: "",
    email: "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState); // Añadir resetForm del hook

  const {
    orderId,
    estado,
    telefono,
    localidad,
    provincia,
    codigoPostal,
    email,
    userId
  } = state;

  const fetchOrders = async (filters) => {
    setIsLoading(true);
    try {
      const res = await getOrdersById(filters);
      setOrders(res);
      if (Object.keys(filters).length === 0) {
        setAllOrders(res);

        const unique = Array.from(
          new Map(
            res?.map((order) => [order.userId, order.user])
          ).entries()
        ).map(([userId, user]) => ({ userId, ...user }));

        setUniqueUsers(unique);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filters);
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFilters = {};
    for (const key in state) {
      const value = state[key].trim();
      if (key === "userId" && value) {
        newFilters[key] = parseInt(value)
      } else if (value !== "") {
        newFilters[key] = {
          contains: value,
          mode: "insensitive", // hace que no distinga entre mayúsculas y minúsculas
        };
      }
    }
    setFilters(newFilters);
  };

  const deleteFilters = () => {
    onResetForm(); // Usar resetForm del hook useForm
    setFilters({});
    setOrders(allOrders); // Restablecer a todos los usuarios
  };

  return (
    <section>
      <h2 className="ordersDash-title">Ordenes</h2>
      <div className="ordersDash-content">
        <div className="ordersDash-box">
          <span className="ordersDash-boxTitulo">Total de Ordenes</span>
          <span className="ordersDash-boxNumero">{allOrders?.length || 0}</span>
        </div>
        <div className="ordersDash-box ordersDash-boxOtherColor">
          <span className="ordersDash-boxTitulo">
            Total de Ordenes Abonadas
          </span>
          <span className="ordersDash-boxNumero">
            {allOrders?.filter((order) => order?.estado === "approved").length || 0}
          </span>
        </div>
        <div className="ordersDash-box">
          <span className="ordersDash-boxTitulo">
            Total de Ordenes Pendientes de Pago
          </span>
          <span className="ordersDash-boxNumero">
            {
              allOrders?.filter(
                (order) =>
                  order?.estado === "pending" || order?.estado === "in_process"
              ).length || 0
            }
          </span>
        </div>
        <div className="ordersDash-box ordersDash-boxOtherColor">
          <span className="ordersDash-boxTitulo">
            Total de Ordenes Rechazadas
          </span>
          <span className="ordersDash-boxNumero">
            {allOrders?.filter((order) => order?.estado === "rejected").length || 0}
          </span>
        </div>
      </div>
      <form className="ordersDash-form" onSubmit={handleSubmit}>
        <div className="ordersDash-formContainer">

          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="orderId">
              N° de Orden
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="orderId"
              id="orderId"
              value={orderId}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="estado">
              Estado de la orden
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="estado"
              id="estado"
              value={estado}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="userId">
              Usuario
            </label>
            <select name="userId" id="userId" className="ordersDash-input" value={userId} onChange={onInputChange}>
              <option className="ordersDash-label" value="">Elige una opción</option>
              {
                uniqueUsers.map((user) => (
                  <option className="ordersDash-label" key={user?.userId} value={user?.userId}>{user?.nombre} {user?.apellido}</option>
                ))
              }
            </select>
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="email">
              Email
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="telefono">
              Telefono
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="localidad">
              Localidad
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="localidad"
              id="localidad"
              value={localidad}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="provincia">
              Provincia
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="provincia"
              id="provincia"
              value={provincia}
              onChange={onInputChange}
            />
          </div>
          <div className="ordersDash-formBox">
            <label className="ordersDash-label" htmlFor="codigoPostal">
              Codigo Postal
            </label>
            <input
              className="ordersDash-input"
              type="text"
              name="codigoPostal"
              id="codigoPostal"
              value={codigoPostal}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="ordersDash-formBtns">
          <button className="ordersDash-btn" type="submit">
            Buscar
          </button>
          <button
            className="ordersDash-btn ordersDash-btnOtherColor"
            type="button"
            onClick={deleteFilters}
          >
            Borrar Filtros
          </button>
        </div>
      </form>
      <ul className="ordersDash-container">
        {isLoading ? (
          [...Array(10)].map((_, index) => (
            <div
              key={index}
              style={{
                margin: ".5rem",
              }}
            >
              <SkeletonComponent width={"100%"} height={"100px"} />
            </div>
          ))
        ) : error ? (
          <li>Hubo un problemas con el servidor. Intente mas tarde</li>
        ) : !orders ? (
          <li>No se encontraron resultados</li>
        ) : (
          orders?.map((order) => (
            <OrderItem
              key={order?.orderId}
              {...order}
              {...order?.user}
              type={user?.rol}
            />
          ))
        )}
      </ul>
    </section>
  );
};
