import { Link } from "react-router-dom";
import "./Item.scss";

export const Item = ({
  productoId,
  nombre,
  precio,
  foto,
  bodega,
  tipo,
  cosecha,
  porcDesc,
  detalle,
  dolarOficial
}) => {

  const precioFinal = Math.round(precio > 0 ? precio * dolarOficial : 0);
  const precioConDescuento = Math.round(precio > 0 ? precio - precio * (porcDesc / 100) : 0);
  const precioFinalConDescuento = Math.round(precioFinal > 0 ? precioFinal - precioFinal * (porcDesc / 100) : 0);

  return (
    <div className="item">
      {porcDesc > 0 && (
        <div className="item-off">
          <p>{porcDesc} %</p>
          <p> OFF</p>
        </div>
      )}
      <div className="item-imageContent">
        <img className="item-img" src={foto} alt={nombre} />
      </div>
      <div className="item-text">
        <strong className="item-title">{nombre}</strong>
        {bodega && (
          <em className="item-desc">
            <strong>Bodega: </strong>
            {bodega}
          </em>
        )}
        {detalle && <em className="item-desc">{detalle}</em>}
        {tipo && (
          <em className="item-desc">
            <strong>Tipo de Uva: </strong>
            {tipo}
          </em>
        )}
        {cosecha && (
          <em className="item-desc">
            <strong>Cosecha: </strong>
            {cosecha}
          </em>
        )}

        {precio !== 0 ? (
          <>
            {porcDesc > 0 ? (
              <>
                <p className="item-price tachado">
                {`U$S ${precio} BNA / AR$ ${precioFinal} c/u`}

                </p>
                <p className="item-price">
                {`U$S ${precioConDescuento} BNA / AR$ ${precioFinalConDescuento} c/u`}

                </p>
              </>
            ) : (
              <p className="item-price">
                {`U$S ${precio} BNA / AR$ ${precioFinal} c/u`}
              </p>
            )}
            <Link to={`/detalle/${productoId}`}>
              <button className="item-btn">VER MAS</button>
            </Link>
          </>
        ) : (
          <>
            <p className="item-price">Disponible Próximamente</p>
            <Link to={`/detalle/${productoId}`}>
              <button className="item-btn">VER MAS</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
