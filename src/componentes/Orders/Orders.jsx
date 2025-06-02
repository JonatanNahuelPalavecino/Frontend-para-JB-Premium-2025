import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import { OrderItem } from "../OrderItem/OrderItem";
import "./Orders.scss"

export const Orders = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [reload, setReload] = useState(false)
  const url = import.meta.env.VITE_SERVER
  const { data, error, loading, fetchData } = useFetch();


  useEffect(() => {
    if (!user?.userId) {
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  useEffect(() => {
    document.title = "Mis ordenes - JB Premium - Vinos Españoles - Distribuidor Oficial"
    
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({filters: {userId: user?.userId}})
    }

    fetchData(`${url}/order/filters`, options)
  }, [fetchData, url, user?.userId, reload])

  return (
  <section className="orders">
    <p className="orders-title">Mis ordenes</p>
    <div className="orders-container">
        {
            loading
            ?
            (
                [...Array(3)].map((_, index) => (
                    <SkeletonComponent key={index} width={"100%"} height={"350px"}/>
                ))
            )
            : error ?
            (
                <p className="orders-emptyText">Hubo un problema con el servidor. Intente más tarde.</p>
            )
            : data?.estado === "error" ?
            (
              <>
                <div className="order">
                  <p className="order-desc"> No tenes ordenes cargadas</p>
                </div>
              </>
            )
            :
            (
                data?.orders?.map((order) => (
                    <OrderItem key={order?.orderId} {...order} {...user} setReload={setReload} type={user?.rol}/>
                ))
            )
        }
    </div>
  </section>
);
};
