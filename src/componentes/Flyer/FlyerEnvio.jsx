import { ImTruck } from "react-icons/im";
import {
  BsFillQuestionCircleFill,
  BsFillBagCheckFill,
  BsBoxSeam,
} from "react-icons/bs";
import { BiMedal } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./FlyerEnvio.scss";

export const FlyerEnvio = ({ bodegas }) => {
  return (
    <section>
      <div className="flyerEnvio">
        <p className="flyerEnvio-title">
          VINOS DE LAS MEJORES BODEGAS DE ESPAÑA
        </p>
        <div className="flyerEnvio-contentImg">
          {bodegas.map((bodega) => (
            <div key={bodega.id} className="flyerEnvio-boxImg">
              <a
                href={bodega.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="flyerEnvio-img"
                  src={bodega.logo}
                  alt={bodega.nombre}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="flyerEnvio-envio">
        <Link to="/detalle-envio" className="flyerEnvio-envioDetail">
          <div>
            <em className="flyerEnvio-envioDesc">
              Envíos gratis a CABA a partir de AR$20.000
              <BsFillQuestionCircleFill className="icon-question" />
            </em>
          </div>
          <div className="flyerEnvio-boxIcon">
            <ImTruck className="flyerEnvio-envioIcon" />
          </div>
        </Link>
        <div className="flyerEnvio-envioDetail">
          <div>
            <em className="flyerEnvio-envioDesc">
              Entregas en 24/72hs dentro de CABA
            </em>
          </div>
          <div className="flyerEnvio-boxIcon">
            <BsFillBagCheckFill className="flyerEnvio-envioIcon" />
          </div>
        </div>
        <div className="flyerEnvio-envioDetail">
          <div>
            <em className="flyerEnvio-envioDesc">
              Productos seguros desde nuestro deposito a tu casa
            </em>
          </div>
          <div className="flyerEnvio-boxIcon">
            <BsBoxSeam className="flyerEnvio-envioIcon" />
          </div>
        </div>
        <div className="flyerEnvio-envioDetail">
          <div>
            <em className="flyerEnvio-envioDesc">
              Vinos de las mejores bodegas de Europa
            </em>
          </div>
          <div className="flyerEnvio-boxIcon">
            <BiMedal className="flyerEnvio-envioIcon" />
          </div>
        </div>
      </div>
    </section>
  );
};
