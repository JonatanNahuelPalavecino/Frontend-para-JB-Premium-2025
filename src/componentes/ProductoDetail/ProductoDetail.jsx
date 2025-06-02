import { BiMapPin } from "react-icons/bi";
import { FiPercent } from "react-icons/fi";
import { ImEye } from "react-icons/im";
import { FaTemperatureLow } from "react-icons/fa";
import { MdOutlineSimCardDownload } from "react-icons/md";
import {
  GiGrapes,
  GiLips,
  GiNoseFront,
  GiKnifeFork,
  GiBarrel,
} from "react-icons/gi";
import "./ProductoDetail.scss";

export const ProductoDetail = ({ producto }) => {
  return (
    <section className="productoDetail">
      <div className="productoDetail-container">
        <p className="productoDetail-title">CARACTERISTICAS</p>
        <p className="productoDetail-desc">{producto?.descUno}</p>
        <div className="productoDetail-datos">
          {producto?.region && (
            <div className="productoDetail-box">
              <p className="productoDetail-title">D.O - {producto?.region}</p>
              <iframe
                className="productoDetail-map"
                title={producto?.nombre}
                src={producto?.ubicacion}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>

        <div className="productoDetail-box">
          {producto?.descDos && (
            <>
              <p className="productoDetail-title">CARACTERISTICAS CLIMATOLOGICAS</p>
              <p className="productoDetail-title">COSECHA {producto?.cosecha}</p>
              <p className="productoDetail-desc">{producto?.descDos}</p>
            </>
          )}
        </div>
      </div>

      {
        (producto?.region || producto?.tipo || producto?.grado || producto?.maridaje || producto?.temp || producto?.crianza) && (

          <div className="productoDetail-ficha">
            <div className="productoDetail-fichaDesc">
              <div className="productoDetail-fichaTitle">
                <p>FICHA TECNICA</p>
              </div>
              <div className="productoDetail-fichaBox">
                {producto?.region && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <BiMapPin className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">DENOMINACIÓN DE ORIGEN</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.region}</p>
                  </div>
                )}
                {producto?.tipo && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <GiGrapes className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">VARIEDAD DE LA UVA</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.tipo}</p>
                  </div>
                )}
                {producto?.grado && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <FiPercent className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">CONTENIDO ALCOHÓLICO</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.grado}</p>
                  </div>
                )}
                {producto?.maridaje && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <GiKnifeFork className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">MARIDAJE</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.maridaje}</p>
                  </div>
                )}
                {producto?.temp && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <FaTemperatureLow className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">TEMPERATURA DE SERVICIO</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.temp}</p>
                  </div>
                )}
                {producto?.crianza && (
                  <div className="productoDetail-fichaBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <GiBarrel className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxDesc">{producto?.crianza}</p>
                  </div>
                )}
                {producto?.pdf && (
                  <>
                    <div className="productoDetail-fichaBoxCol">
                      <a
                        href={producto?.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="productoDetail-fichaIcon"
                      >
                        <MdOutlineSimCardDownload className="productoDetail-icon" />
                      </a>
                      <p className="productoDetail-fichaBoxTitle">
                        DESCARGAR FICHA TECNICA
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {producto?.faseVis && producto?.faseOlf && producto?.faseGus && (
              <div className="productoDetail-fichaDesc">
                <div className="productoDetail-fichaTitle">
                  <p>NOTA DE CATA</p>
                </div>
                {producto?.faseVis && (
                  <div className="productoDetail-cataBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <ImEye className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">FASE VISUAL</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.faseVis}</p>
                  </div>
                )}

                {producto?.faseOlf && (
                  <div className="productoDetail-cataBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <GiNoseFront className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">FASE OLFATIVA</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.faseOlf}</p>
                  </div>
                )}
                {producto?.faseGus && (
                  <div className="productoDetail-cataBoxCol">
                    <div className="productoDetail-fichaIcon">
                      <GiLips className="productoDetail-icon" />
                    </div>
                    <p className="productoDetail-fichaBoxTitle">FASE GUSTATIVA</p>
                    <p className="productoDetail-fichaBoxDesc">{producto?.faseGus}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      }
    </section>
  );
};


// premios && Object.keys(premios).length > 0 ? (
//     <div className="content-premioBox">
//       <p className="content-premioTitle" style={{textDecoration: "underline"}}>PREMIOS</p>
//       <div className="content-premioRow">
//         {Object.entries(premios).map(([key, premio]) => (
//           <React.Fragment key={key}>
//             <hr />
//             <div className="content-premioDesc">
//               <p>{key}</p> {/* Aquí el valor de la propiedad */}
//               <p>{premio}</p>    {/* Aquí el valor del campo "value" */}
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
// ) : null
