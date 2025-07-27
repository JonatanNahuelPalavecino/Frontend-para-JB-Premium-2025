import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Producto } from "../Producto/Producto";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import { ProductoDetail } from "../ProductoDetail/ProductoDetail";
import {AccesoriosContainer} from "../AccesoriosContainer/AccesoriosContainer"

export const ProductoContainer = () => {
  const { productoId } = useParams();
  const { data, error, loading, fetchData } = useFetch();
  const url = import.meta.env.VITE_SERVER;

  useEffect(() => {
    fetchData(`${url}/products/${productoId}`);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productoId]);

  const nombre = data?.product?.nombre || ""

  return (
    <main className="producto">
      {loading ? (
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "3fr 1fr", gap: "1.5rem", height: "750px" }}>
          <SkeletonComponent width={"100%"} height={"100%"} />
          <div style={{ display: "grid", gridTemplateRows: "1.5fr 2.5fr", gap: "1.5rem", height: "100%" }}>
            <SkeletonComponent width={"100%"} height={"100%"} />
            <SkeletonComponent width={"100%"} height={"100%"} />
          </div>
        </div>
      ) : error ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{textAlign: "center"}}>Hubo un problema con el servidor: {error}</p>
        </div>
      ) : (
        <>
          <Producto producto={data.product} />
          {
            (nombre !== "Caja Individual" && nombre !== "Caja Doble") && (
              <>
                <AccesoriosContainer/>
                <ProductoDetail producto={data.product}/>
              </>
            )
          }
        </>
      )}
    </main>
  );
};
