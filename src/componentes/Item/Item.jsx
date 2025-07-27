import { Link } from "react-router-dom";
import "./Item.scss";
import { useContext } from "react";
import { Context } from "../Context/Context";

export const Item = ({
  productoId,
  nombre,
  precio,         //dolares
  precioEnPesos,  //pesos argentinos
  foto,
  bodega,
  tipo,
  cosecha,
  porcDesc,
  detalle,
}) => {

  const {calcularDescuento} = useContext(Context)

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

        {precio !== 0 || precioEnPesos !== 0 ? (
          <>
            {porcDesc > 0 ? (
              <>
                <p className="item-price tachado">
                {`U$S ${precio} BNA / AR$ ${precioEnPesos} c/u`}

                </p>
                <p className="item-price">
                {`U$S ${calcularDescuento(precio, porcDesc)} BNA / AR$ ${calcularDescuento(precioEnPesos, porcDesc)} c/u`}

                </p>
              </>
            ) : (
              <p className="item-price">
                {`U$S ${precio} BNA / AR$ ${precioEnPesos} c/u`}
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
