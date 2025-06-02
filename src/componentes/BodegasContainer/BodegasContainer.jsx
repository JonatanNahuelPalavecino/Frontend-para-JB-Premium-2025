import React from "react";
import "./BodegasContainer.scss";
import { FlyerProd } from "../Flyer/FlyerProd";
import { BodegasItems } from "../BodegasItems/BodegasItems";

export const BodegasContainer = ({
  bodega,
  flyer,
  productos,
  loading,
  error,
}) => {
  const productoDestacado = productos.find(
    (producto) => producto.destacado === true
  );

  return (
    <section className="bod">
      <div className="bod-logoBox">
        <img className="bod-logoImg" src={bodega.img} alt={bodega.name} />
      </div>
      {error ? (
        <div>
          <p>Hubo un problema con el servidor. Intente más tarde.</p>
        </div>
      ) : (
        <>
          <div className="bod-flyer">
            <img className="bod-flyerImg" src={flyer.img} alt={flyer.name} />
            <FlyerProd {...productoDestacado} bodega={bodega.name} />
          </div>
          <div className="bod-container">
            <BodegasItems
              productos={productos}
              bodega={bodega.name}
              loading={loading}
            />
          </div>
        </>
      )}
    </section>
  );
};
