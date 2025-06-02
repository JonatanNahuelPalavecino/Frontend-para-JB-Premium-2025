import { useNavigate } from "react-router-dom";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import "./ProductoDash.scss";

export const ProductoDash = ({
  products,
  isLoading,
  error,
  setProductSelected,
  setType,
  setOpen,
}) => {
  const navigate = useNavigate();
  const handleClick = (type, product) => {
    setProductSelected(product);
    setType(type);
    setOpen(true);
  };

  return (
    <>
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
      ) : products?.length === 0 ? (
        <li>No se encontraron resultados</li>
      ) : (
        products?.map((product) => (
          <li key={product?.productoId} className="productDash">
            <p className="productDash-title">Datos Principales</p>
            <div className="productDash-container">
              <div className="productDash-box">
                <p className="productDash-title">Nombre</p>
                <p className="productDash-desc">
                  {product?.nombre ? product?.nombre : "No tiene ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Bodega</p>
                <p className="productDash-desc">
                  {product?.bodega ? product?.bodega : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Precio</p>
                <p className="productDash-desc">
                  {product?.precio
                    ? `USD$ ${product?.precio}`
                    : "No tiene precio ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Activo</p>
                <p className="productDash-desc">
                  {product?.activo ? "✅" : "❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Accesorio</p>
                <p className="productDash-desc">
                  {product?.accesorio ? "✅" : "❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Promoción</p>
                <p className="productDash-desc">
                  {product?.promocion ? "✅" : "❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Porcentaje de Descuento</p>
                <p className="productDash-desc">
                  {product?.porcDesc
                    ? `${product?.porcDesc}% OFF`
                    : "No tiene descuento ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Producto Destacado</p>
                <p className="productDash-desc">
                  {product?.destacado ? "✅" : "❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Stock Disponible</p>
                <p className="productDash-desc">
                  {product?.stock_disponible
                    ? `${product?.stock_disponible} unidad/es`
                    : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Stock Total</p>
                <p className="productDash-desc">
                  {product?.stock_total ? `${product?.stock_total} unidad/es` : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Foto</p>
                {product?.foto ? (
                  <button
                    onClick={() => handleClick("ver_foto", product)}
                    className="productDash-btn"
                  >
                    Ver foto
                  </button>
                ) : (
                  <p className="productDash-desc">No hay foto ❌</p>
                )}
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Pdf</p>
                {product?.pdf ? (
                  <button
                    onClick={() => handleClick("ver_pdf", product)}
                    className="productDash-btn"
                  >
                    Ver pdf
                  </button>
                ) : (
                  <p className="productDash-desc">No hay PDF ❌</p>
                )}
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Foto Promoción</p>
                {product?.fotoPromo ? (
                  <button
                    onClick={() => handleClick("ver_fotoPromo", product)}
                    className="productDash-btn"
                  >
                    Ver foto Promoción
                  </button>
                ) : (
                  <p className="productDash-desc">No hay foto ❌</p>
                )}
              </div>
            </div>
            <p className="productDash-title">Datos Generales</p>
            <div className="productDash-container">
              <div className="productDash-box">
                <p className="productDash-title">Cosecha</p>
                <p className="productDash-desc">
                  {product?.cosecha ? product?.cosecha : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Región</p>
                <p className="productDash-desc">
                  {product?.region ? product?.region : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Crianza</p>
                <p className="productDash-desc">
                  {product?.crianza ? product?.crianza : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">1° Descripción</p>
                <p className="productDash-desc">
                  {product?.descUno ? product?.descUno : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">2° Descripción</p>
                <p className="productDash-desc">
                  {product?.descDos ? product?.descDos : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Fase Gustativa</p>
                <p className="productDash-desc">
                  {product?.faseGus ? product?.faseGus : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Fase Olfativa</p>
                <p className="productDash-desc">
                  {product?.faseOlf ? product?.faseOlf : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Fase Visual</p>
                <p className="productDash-desc">
                  {product?.faseVis ? product?.faseVis : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Grado</p>
                <p className="productDash-desc">
                  {product?.grado ? product?.grado : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Maridaje</p>
                <p className="productDash-desc">
                  {product?.maridaje ? product?.maridaje : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Temperatura de Servicio</p>
                <p className="productDash-desc">
                  {product?.temp ? product?.temp : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Tipo</p>
                <p className="productDash-desc">
                  {product?.tipo ? product?.tipo : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Ubicación</p>
                <p className="productDash-desc">
                  {product?.ubicacion ? product?.ubicacion : "Sin Datos ❌"}
                </p>
              </div>
              <div className="productDash-box">
                <p className="productDash-title">Estilo</p>
                <p className="productDash-desc">
                  {product?.vino ? product?.vino : "Sin Datos ❌"}
                </p>
              </div>
            </div>
            <p className="productDash-title">Otros Datos</p>
            <div className="productDash-container">
              <div className="productDash-box">
                <p className="productDash-title">Detalle (Para accesorios)</p>
                <p className="productDash-desc">
                  {product?.detalle ? product?.detalle : "Sin Datos ❌"}
                </p>
              </div>
            </div>
            <div className="productDash-btns">
              <button
                className="productDash-btn"
                onClick={() =>
                  navigate(`/dashboard/editar-producto/${product?.productoId}`)
                }
              >
                Editar
              </button>
              <button
                className="productDash-btn productDash-btnOtherColor"
                onClick={() => handleClick("eliminar", product)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))
      )}
    </>
  );
};
