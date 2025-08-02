import { useContext, useEffect, useState } from "react";
import useForm from "../Hooks/useForm";
import { verifyForm } from "../utils/validation/verifyForm";
import "./ResetPass.scss";
import { postRecoveredPass } from "../utils/peticiones/postRecoveredPass";
import { Context } from "../Context/Context";
import { toast } from "sonner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export const ResetPass = ({ type }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const { state, onInputChange, onResetForm } = useForm(initialState);

  const { email, password } = state;
  const [err, setErr] = useState();
  const [see, setSee] = useState(false);
  const { setLoading } = useContext(Context);
  const navigate = useNavigate()

  const token =
    type === "cambiar-password"
      ? new URLSearchParams(window.location.search).get("token")
      : null;

  useEffect(() => {
    document.title = `${
      type === "restablecer-password"
        ? "Recuperar Contraseña"
        : "Cambiar Contraseña"
    } - JB Premium - Vinos Españoles - Distribuidor Oficial`;
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

    const data = await postRecoveredPass(
      verificarForm.values,
      type,
      setLoading,
      token
    );

    if (data.estado === "error") {
      toast.error(data.mensaje);
      return;
    } else if (data.message === "Failed to fetch") {
      toast.warning("Hubo un error con el servidor. Intente más tarde.");
      return;
    }

    setTimeout(() => {
      navigate("/")
      toast.success(data.mensaje);
    }, 500)
  };
  return (
    <section className="resetPass">
      <p className="resetPass-title">
        {type === "cambiar-password"
          ? "Cambiar Contraseña"
          : "Recuperar Contraseña"}
      </p>
      <form className="resetPass-form" onSubmit={handleSubmit}>
        {type === "restablecer-password" && (
          <div className="resetPass-box">
            <label className="resetPass-label" htmlFor="email">
              E-mail
            </label>
            <input
              className="resetPass-input"
              type="text"
              value={email}
              name="email"
              id="email"
              onChange={onInputChange}
              autoComplete="on"
            />
            <p className="resetPass-error">{err ? err.email : ""}</p>
          </div>
        )}
        {type === "cambiar-password" && (
          <div className="resetPass-box">
            <label className="resetPass-label" htmlFor="password">
              Contraseña
            </label>
            <div className="resetPass-pass">
              <input
                className="resetPass-input"
                type={see ? "text" : "password"}
                value={password}
                name="password"
                id="password"
                onChange={onInputChange}
              />
              <button
                className="resetPass-visibility"
                onClick={() => setSee(!see)}
                type="button"
              >
                {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
            <p className="resetPass-error">{err ? err.password : ""}</p>
          </div>
        )}
        {type === "restablecer-password" ? (
          <>
            <button className="resetPass-btn" type="submit">
              Restablecer contraseña
            </button>
          </>
        ) : (
          <>
            <button className="resetPass-btn" type="submit">
              Cambiar Contraseña
            </button>
          </>
        )}
      </form>
    </section>
  );
};
