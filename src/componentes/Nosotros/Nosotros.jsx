import { FlyerEnvio } from "../Flyer/FlyerEnvio";
import { bodegas } from "../utils/datos/bodegas";
import "./Nosotros.scss";

export const Nosotros = () => {
  return (
    <>
      <main className="nosotros">
        <p className="nosotros-title">NOSOTROS</p>
        <div className="nosotros-content">
          <p className="nosotros-desc nosotros-width">
            JB Premium es una empresa localizada en Argentina, Buenos aires,
            especializada en la comercialización y distribución de vinos
            españoles. Contamos con 10 años de experiencia en la importación,
            representando con exclusividad a bodegas líderes y con historia en
            esta categoría siendo pioneras a lo largo de la historia.
            <br />
            Desarrollamos nuestra actividad a través de múltiples canales
            comerciales: mayoristas, restaurantes, vinotecas, y amantes del
            vino.
          </p>
          <div className="nosotros-contentBox">
            <div className="nosotros-contentDesc">
              <p className="nosotros-title">NUESTRA MISIÓN</p>
              <p className="nosotros-desc">
                Nuestro objetivo principal es proveer productos de calidad, con
                raíces e historia y ponerlos al alcance del consumidor Argentino
                pasando por la experiencia del viejo continente en su mesa y
                traerles el mayor tesoro vinícola del mundo.
              </p>
            </div>
            <div className="nosotros-contentImg">
              <img
                className="nosotros-img"
                src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1743966262/flyer/yotpmlmkocv2ywypozeu.jpg"
                alt="nosotros1"
              />
            </div>
          </div>
          <div className="nosotros-contentBox nosotros-reverse">
            <div className="nosotros-contentImg">
              <img
                className="nosotros-imgWidth"
                src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1743966263/flyer/o8q3lazojzyolcoc1qwm.jpg"
                alt="nosotros2"
              />
            </div>
            <div className="nosotros-contentDesc">
              <p className="nosotros-title">NUESTRO VALOR</p>
              <p className="nosotros-desc">
                Nos apasiona la comercialización, los vinos que representamos y
                el éxito compartido, Respetando todos los procesos, valorando la
                tierra, la gente y la cultura española.
              </p>
            </div>
          </div>
          <div className="nosotros-contentBox">
            <div className="nosotros-contentDesc">
              <p className="nosotros-title">NUESTRO DESAFÍO</p>
              <p className="nosotros-desc">
                Nuestra filosofía de negocios es ofrecer un alto nivel de vinos
                y al mejor precio posible, dándonos a conocer en toda la
                Argentina, y puedan pasar por una experiencia única.
              </p>
            </div>
            <div className="nosotros-contentImg">
              <video
                className="nosotros-imgWidth nosotros-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://res.cloudinary.com/dabgfr6qn/video/upload/v1743192246/videos/s5cukytuszg3bpbexfc0.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>
      </main>
      <FlyerEnvio bodegas={bodegas}/>
    </>
  );
};
