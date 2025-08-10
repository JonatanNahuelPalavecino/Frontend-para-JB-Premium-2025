import { useEffect, useState, useMemo } from "react";
import { getUsers } from "../utils/peticiones/getUsers";
import { getOrdersById } from "../utils/peticiones/getOrders";
import { getTransactions } from "../utils/peticiones/getTransactions";
import "./PanelStatus.scss";
import { getProducts } from "../utils/peticiones/getProducts";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";

export const PanelStatus = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserAndOrders = async () => {
    setLoading(true)
    try {
      const [resUser, resOrder, resTrans, resProd] = await Promise.all([
        getUsers(),
        getOrdersById(),
        getTransactions(),
        getProducts({}, 1, 100),
      ]);

      if (resUser.estado === "error") {
        navigate("/");
        toast.error("Tu sesión ha caducado. Vuelve a iniciar sesión.");
        return;
      }

      setUsers(resUser?.users);
      setOrders(resOrder);
      setTransactions(resTrans);
      setProducts(resProd.products);
    } catch (error) {
      toast.error("Error al cargar los datos del panel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datos = useMemo(
    () => [
      {
        name: "Usuarios",
        dato: [
          { name: "Total de Usuarios", dato: users?.length },
          {
            name: "Total de Usuarios Activos",
            dato: users?.filter((user) => user?.orders?.length >= 1).length,
          },
        ],
        href: "/dashboard/usuarios",
      },
      {
        name: "Ordenes",
        dato: [
          { name: "Total de Ordenes", dato: orders?.length || 0 },
          {
            name: "Abonadas",
            dato:
              orders?.filter((order) => order?.estado === "approved").length ||
              0,
          },
          {
            name: "Pendientes de Pago",
            dato:
              orders?.filter(
                (order) =>
                  order?.estado === "pending" || order?.estado === "in_process"
              ).length || 0,
          },
          {
            name: "Rechazadas",
            dato:
              orders?.filter((order) => order?.estado === "rejected").length ||
              0,
          },
        ],
        href: "/dashboard/ordenes",
      },
      {
        name: "Transacciones",
        dato: [
          { name: "Total de Transacciones", dato: transactions?.length },
          {
            name: "Acreditados",
            dato: transactions?.filter((t) => t?.estado === "approved").length || 0,
          },
          {
            name: "Pendiente de Pago",
            dato: transactions?.filter(
              (t) => t?.estado === "pending" || t?.estado === "in_process"
            ).length || 0,
          },
          {
            name: "Rechazadas",
            dato: transactions?.filter((t) => t?.estado === "rejected").length || 0,
          },
          {
            name: "Ingresos Brutos en Pesos",
            dato: `AR$ ${transactions
              ?.reduce(
                (acc, t) =>
                  t?.pagoRecibido > 0 && t.moneda === "ARS"
                    ? acc + t?.pagoBruto
                    : acc,
                0
              )
              .toLocaleString("es-ES")}` || 0,
          },
          {
            name: "Ingresos Netos en Pesos",
            dato: `AR$ ${transactions
              ?.reduce(
                (acc, t) => (t.moneda === "ARS" ? acc + t?.pagoRecibido : acc),
                0
              )
              .toLocaleString("es-ES")}` || 0,
          },
          {
            name: "Ingresos Brutos en Dolares",
            dato: `U$S ${transactions
              ?.reduce(
                (acc, t) =>
                  t?.pagoRecibido > 0 && t.moneda === "USD"
                    ? acc + t?.pagoBruto
                    : acc,
                0
              )
              .toLocaleString("es-ES")}` || 0,
          },
          {
            name: "Ingresos Netos en Dolares",
            dato: `U$S ${transactions
              ?.reduce(
                (acc, t) => (t.moneda === "USD" ? acc + t?.pagoRecibido : acc),
                0
              )
              .toLocaleString("es-ES")}` || 0,
          },
        ],
        href: "/dashboard/transacciones",
      },
      {
        name: "Productos",
        dato: [
          { name: "Total de Productos", dato: products?.length },
          {
            name: "Activos",
            dato: products?.filter((t) => t?.activo == true).length,
          },
          {
            name: "Inactivos",
            dato: products?.filter((t) => t?.activo == false).length,
          },
          {
            name: "Con Descuento",
            dato: products?.filter((t) => t?.porcDesc > 0).length,
          },
          {
            name: "Accesorios",
            dato: products?.filter((t) => t?.accesorio == true).length,
          },
        ],
        href: "/dashboard/productos",
      },
    ],
    [users, orders, transactions, products]
  );

  return (
    <section className="panelStatus">
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.5rem",
                margin: "2rem 0",
              }}
            >
              <SkeletonComponent width={"300px"} height={"75px"} />
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <SkeletonComponent height={"135px"} />
                <SkeletonComponent height={"135px"} />
              </div>
              <SkeletonComponent width={"170px"} height={"35px"} />
            </div>
          ))}
        </div>
      ) : (
        <div className="panelStatus-contenedor">
          {datos.map((categoria, index) => (
            <div key={index} className="panelStatus-categoria">
              <h3 className="panelStatus-categoriaTitulo">{categoria.name}</h3>
              <div className="panelStatus-datosGrid">
                {categoria.dato.map((item, i) => (
                  <div
                    key={i}
                    className={
                      i % 2 === 0
                        ? "panelStatus-datoCard"
                        : "panelStatus-datoCard panelStatus-datoCardOtherColor"
                    }
                  >
                    <span className="panelStatus-datoTitulo">{item.name}</span>
                    <span className="panelStatus-datoNumero">{item.dato}</span>
                  </div>
                ))}
              </div>
              <Link className="panelStatus-btn" to={categoria.href}>
                Ver más {categoria.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
