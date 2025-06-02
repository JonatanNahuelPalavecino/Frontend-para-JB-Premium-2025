import { Item } from "../Item/Item";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import "./Productos.scss";

export const Productos = ({
  isLoading,
  error,
  productos,
  dolarOficial,
  type,
}) => {
  const data = productos?.products?.filter((producto) =>
    type === "vinos"
      ? producto.accesorio === false && producto.activo
      : producto.accesorio === true && producto.activo
  );

  return (
    <>
      <p className="productos-subtitle">
        {type === "vinos" ? "Nuestros Vinos" : "Nuestros Accesorios"}
      </p>
      {isLoading ? (
        <div className="productos-box">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                margin: "1rem",
              }}
            >
              <SkeletonComponent width={"300px"} height={"350px"} />
              <SkeletonComponent width={"300px"} height={"200px"} />
            </div>
          ))}
        </div>
      ) : error ? (
        <p>Hubo un error con el servidor. Intente más tarde.</p>
      ) : data?.length > 0 ? (
        <div className="productos-box">
          {data?.map((producto) => (
            <Item
              key={producto.productoId}
              {...producto}
              dolarOficial={dolarOficial}
            />
          ))}
        </div>
      ) : (
        <p className="productos-desc">
          No se encontraron productos con los filtros seleccionados
        </p>
      )}
    </>
  );
};
