import { useContext, useEffect, useState } from "react";
import useForm from "../Hooks/useForm";
import { Context } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Auth.scss";
import { verifyForm } from "../utils/validation/verifyForm";
import { postAuth } from "../utils/peticiones/postAuth";
import { toast } from "sonner";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { activateUser } from "../utils/peticiones/activateUser";

export const Auth = ({ type }) => {
  const initialState = {
    userName: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    edad: "",
    telefono: "",
  };
  const { state, onInputChange, onResetForm } = useForm(initialState);
  const [open, setOpen] = useState(false);
  const [mail, setMail] = useState("");
  const { nombre, apellido, email, password, edad, telefono } = state;
  const { user, setUser, setLoading } = useContext(Context);
  const [err, setErr] = useState();
  const [see, setSee] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.auth]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    document.title =
      type === "auth"
        ? "Inicia Sesión - JB Premium - Vinos Españoles - Distribuidor Oficial"
        : "Registrate - JB Premium - Vinos Españoles - Distribuidor Oficial";
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificarForm = verifyForm(state, type);

    if (verificarForm.estado === "error") {
      setErr(verificarForm.error);
      return;
    }

    setErr();
    onResetForm();

    const data = await postAuth(verificarForm.values, type, setLoading);

    if (data.estado === "error") {
      toast.error(data.mensaje);
      console.log(data);
      if (data.mensaje === "El usuario está desactivado.") {
        setMail(data.email);
        setOpen(true);
      }
      return;
    } else if (data.message === "Failed to fetch") {
      toast.warning("Hubo un error con el servidor. Intente más tarde.");
      return;
    }

    setUser(data.user[0]);
    toast.success(data.mensaje);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleActivateUser = async () => {
    const data = await activateUser(mail, null, setLoading);

    if (data.estado === "error") {
      toast.error(data.mensaje);
      return;
    } else if (data.message === "Failed to fetch") {
      toast.warning("Hubo un error con el servidor. Intente más tarde.");
      return;
    }

    toast.success(data.mensaje);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <section className="auth">
      <p className="auth-title">
        {type === "auth" ? "Iniciar Sesión" : "Registrate"}
      </p>
      <form className="auth-form" onSubmit={handleSubmit}>
        {type === "register" && (
          <>
            <div className="auth-box">
              <label className="auth-label" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="auth-input"
                type="text"
                value={nombre}
                name="nombre"
                id="nombre"
                onChange={onInputChange}
              />
              <p className="auth-error">{err ? err.nombre : ""}</p>
            </div>
            <div className="auth-box">
              <label className="auth-label" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="auth-input"
                type="text"
                value={apellido}
                name="apellido"
                id="apellido"
                onChange={onInputChange}
              />
              <p className="auth-error">{err ? err.apellido : ""}</p>
            </div>
            <div className="auth-box">
              <label className="auth-label" htmlFor="edad">
                Edad
              </label>
              <input
                className="auth-input"
                type="number"
                value={edad}
                name="edad"
                id="edad"
                onChange={onInputChange}
              />
              <p className="auth-error">{err ? err.edad : ""}</p>
            </div>
            <div className="auth-box">
              <label className="auth-label" htmlFor="telefono">
                Telefono
              </label>
              <input
                className="auth-input"
                type="text"
                value={telefono}
                name="telefono"
                id="telefono"
                onChange={onInputChange}
              />
              <p className="auth-error">{err ? err.telefono : ""}</p>
            </div>
          </>
        )}
        <div className="auth-box">
          <label className="auth-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="auth-input"
            type="text"
            value={email}
            name="email"
            id="email"
            onChange={onInputChange}
            autoComplete="on"
          />
          <p className="auth-error">{err ? err.email : ""}</p>
        </div>
        <div className="auth-box">
          <label className="auth-label" htmlFor="password">
            Contraseña
          </label>
          <div className="auth-pass">
            <input
              className="auth-input"
              type={see ? "text" : "password"}
              value={password}
              name="password"
              id="password"
              onChange={onInputChange}
            />
            <button
              className="auth-visibility"
              onClick={() => setSee(!see)}
              type="button"
            >
              {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <p className="auth-error">{err ? err.password : ""}</p>
        </div>
        <div className="auth-btns">
          {type === "auth" ? (
            <>
              <button className="auth-btn" type="submit">
                Inicia Sesión
              </button>
              <Link
                className="auth-btn auth-btnOtherColor"
                to="/registro-usuario"
              >
                Registrate
              </Link>
            </>
          ) : (
            <>
              <button className="auth-btn" type="submit">
                Registrate
              </button>
              <Link className="auth-btn auth-btnOtherColor" to="/inicio-sesion">
                Inicia Sesión
              </Link>
            </>
          )}
        </div>
        {type === "auth" ? (
          <Link className="auth-recover" to="/restablecer-password">
            ¿Olvidaste tu contraseña? Restablecela haciendo click aca
          </Link>
        ) : (
          <Link className="auth-recover" to="/terminos-condiciones">
            Al registrarte en nuestra web, estás aceptando nuestros térmicos y
            condiciones. Para verlas, click aca.
          </Link>
        )}
      </form>
      <ModalContainer open={open} onClose={() => setOpen(false)}>
        <div className="auth-modal">
          <p className="auth-modalText">
            Tu cuenta {mail} está desactivada.
          </p>
          <p className="auth-modalText">
            Si queres volver a operar con nosotros, tendrás que activarla.
          </p>
          <div className="auth-modalBtns">
            <button onClick={() => setOpen(false)} className="auth-btn">
              Cancelar
            </button>
            <button
              onClick={handleActivateUser}
              className="auth-btn auth-btnOtherColor"
            >
              Activar
            </button>
          </div>
        </div>
      </ModalContainer>
    </section>
  );
};
