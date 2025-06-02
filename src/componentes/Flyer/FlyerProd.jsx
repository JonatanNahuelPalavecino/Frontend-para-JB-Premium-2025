import { Link } from "react-router-dom";
import "./FlyerProd.scss";

export const FlyerProd = ({ nombre, productoId, foto, bodega }) => {
  return (
    <>
      <div className="flyerProd-content">
        <p className="flyerProd-text">
          Elegí el vino destacado de <em>{bodega}</em>
        </p>
        <Link to={`/detalle/${productoId}`}>
          <button className="flyerProd-btn">COMPRAR</button>
        </Link>
      </div>
      <div className="flyerProd-content">
        <img className="flyerProd-img" src={foto} alt={nombre} />
      </div>
    </>
  );
};
