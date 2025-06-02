import { useEffect, useState, useMemo } from "react"
import { getUsers } from "../utils/peticiones/getUsers"
import { getOrdersById } from "../utils/peticiones/getOrders"
import { getTransactions } from "../utils/peticiones/getTransactions"
import "./PanelStatus.scss"
import { getProducts } from "../utils/peticiones/getProducts"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const PanelStatus = () => {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [transactions, setTransactions] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const fetchUserAndOrders = async () => {
        const [resUser, resOrder, resTrans, resProd] = await Promise.all([
            getUsers(),
            getOrdersById(),
            getTransactions(),
            getProducts({}, 1, 100)
        ])

        if (resUser.estado === "error") {
            navigate("/")
            toast.error("Tu sesión ha caducado. Vuelve a iniciar sesión.")
            return
        }

        setUsers(resUser?.users)
        setOrders(resOrder)
        setTransactions(resTrans)
        setProducts(resProd.products)
    
    }

    useEffect(() => {
        fetchUserAndOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const datos = useMemo(() => [
        {
            name: "Usuarios",
            dato: [
                { name: "Total de Usuarios", dato: users?.length },
                { name: "Total de Usuarios Activos", dato: users?.filter(user => user?.orders?.length >= 1).length },
            ],
            href: "/dashboard/usuarios"
        },
        {
            name: "Ordenes",
            dato: [
                { name: "Total de Ordenes", dato: orders?.length || 0 },
                { name: "Abonadas", dato: orders?.filter(order => order?.estado === "approved").length || 0 },
                { name: "Pendientes de Pago", dato: orders?.filter(order => order?.estado === "pending" || order?.estado === "in_process").length || 0 },
                { name: "Rechazadas", dato: orders?.filter(order => order?.estado === "rejected").length || 0 },
            ],
            href: "/dashboard/ordenes"
        },
        {
            name: "Transacciones",
            dato: [
                { name: "Total de Transacciones", dato: transactions?.length },
                { name: "Acreditados", dato: transactions?.filter(t => t?.estado === "approved").length },
                { name: "Pendiente de Pago", dato: transactions?.filter(t => t?.estado === "pending" || t?.estado === "in_process").length },
                { name: "Rechazadas", dato: transactions?.filter(t => t?.estado === "rejected").length },
                { name: "Ingresos Brutos", dato: `$ ${transactions?.reduce((acc, t) => t?.pagoRecibido > 0 ? acc + t?.pagoBruto : acc, 0).toLocaleString("es-ES")}` },
                { name: "Ingresos Netos", dato: `$ ${transactions?.reduce((acc, t) => acc + t?.pagoRecibido, 0).toLocaleString("es-ES")}` },
            ],
            href: "/dashboard/transacciones"
        },
        {
            name: "Productos",
            dato: [
                { name: "Total de Productos", dato: products?.length },
                { name: "Activos", dato: products?.filter(t => t?.activo === true).length },
                { name: "Inactivos", dato: products?.filter(t => t?.activo === false).length },
                { name: "Con Descuento", dato: products?.filter(t => t?.porcDesc > 0).length },
                { name: "Accesorios", dato: products?.filter(t => t?.accesorio === true).length },
            ],
            href: "/dashboard/productos"
        }
    ], [users, orders, transactions, products])

    return (
        <section className="panelStatus">
            <div className="panelStatus-contenedor">
                {datos.map((categoria, index) => (
                    <div key={index} className="panelStatus-categoria">
                        <h3 className="panelStatus-categoriaTitulo">{categoria.name}</h3>
                        <div className="panelStatus-datosGrid">
                            {categoria.dato.map((item, i) => (
                                <div key={i} className={i % 2 === 0 ? "panelStatus-datoCard" : "panelStatus-datoCard panelStatus-datoCardOtherColor"}>
                                    <span className="panelStatus-datoTitulo">{item.name}</span>
                                    <span className="panelStatus-datoNumero">{item.dato}</span>
                                </div>
                            ))}
                        </div>
                        <Link className="panelStatus-btn" to={categoria.href}>Ver mas {categoria.name}</Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
