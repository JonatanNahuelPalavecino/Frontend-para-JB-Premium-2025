import { Link } from "react-router-dom";
import {
  BsFillQuestionCircleFill,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import "./Footer.scss";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-col footer-col-width">
          <em className="footer-title">
            <Link className="link-detail footer-title" to="/detalle-venta">
              Venta Minorista, Mayorista y Comercial
              <BsFillQuestionCircleFill className="icon-question" />
            </Link>
          </em>
          <em className="footer-title">Atención al Cliente</em>
          <ul className="footer-ul">
            <li className="footer-item">
              De Lunes a Sabado de 10:00 a 18:00 Horas
            </li>
            <li className="footer-item">
              <a
                className="footer-link"
                href="https://wa.me/5491166670119?text=Hola%20equipo%20de%20JB%20Premium,%20quisiera%20consultarte%20por..."
                target="_blank"
                rel="noreferrer"
              >
                Click aqui para nuestro chat
              </a>
            </li>
            <li className="footer-item">
              <strong>Buenos Aires - Argentina</strong>
            </li>
            <li className="footer-item">contacto@jbpremium.com</li>
          </ul>
        </div>
        <div className="footer-col">
          <em className="footer-title">Nuestras Secciones</em>
          <ul className="footer-ul">
            <li className="footer-item">
              <Link className="footer-nav" to="/">
                Inicio
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/nosotros">
                Nosotros
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/productos">
                Productos
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/carrito">
                Mi Carrito
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/detalle-envio">
                Envíos
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/preguntas-frecuentes">
                Preguntas Frecuentes
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-nav" to="/terminos-condiciones">
                Términos y Condiciones
              </Link>
            </li>
          </ul>
          <em className="footer-title">Nuestras Redes</em>
          <ul className="footer-rowIcons">
            <li className="footer-item">
              <div className="footer-boxIcons">
                <a
                  className="footer-nav"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/"
                >
                  <div className="footer-contentRedes">
                    <BsFacebook className="footer-redes" />
                  </div>
                </a>
              </div>
            </li>
            <li className="footer-item">
              <div className="footer-boxIcons">
                <a
                  className="footer-nav"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/vinosespanolesjb/"
                >
                  <div className="footer-contentRedes">
                    <BsInstagram className="footer-redes" />
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-boxImg">
            <img
              className="footer-img"
              src="https://res.cloudinary.com/dcyhxj1nn/image/upload/v1754487345/logo_ibirsr.png"
              alt="logo"
            />
          </div>
          <p className="footer-text">VINOS ESPAÑOLES</p>
        </div>
      </div>
      <div className="footer-col">
        <div className="footer-advices">
          <p className="footer-advice">
            Al navegar en nuestra página, estás aceptando nuestros términos y
            condiciones. Para verlas, 
            <Link className="footer-adviceLink" to="/terminos-condiciones">
               {" "}hacé click acá
            </Link>
          </p>
          <p className="footer-advice">
            Prohibida la venta de bebidas alcohólicas a menores de 18 años. Ley
            N° 24.788.
          </p>
        </div>
        <p className="footer-firma">
          © {year} JB Premium. Todos los derechos reservados.
        </p>
        <div className="footer-rowDes">
          <p className="footer-firma">Desarrolado por © </p>
          <img
            className="footer-logoDes"
            src="https://portafolio2025.alwaysdata.net/public/logo/logo-portafolio.png"
            alt="logo-Jonatan-Palavecino"
          />
          <a
            className="footer-firma"
            href="https://jonatanpalavecino.com.ar/"
            target="_blank"
            rel="noreferrer"
          >
            Jonatan Palavecino
          </a>
        </div>
      </div>
    </footer>
  );
};
