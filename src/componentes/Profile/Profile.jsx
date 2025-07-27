import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import { putUser } from "../utils/peticiones/putUser";
import { verifyForm } from "../utils/validation/verifyForm";
import { toast } from "sonner";
import { postLogOut } from "../utils/peticiones/postLogOut";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(Context);
  const [change, setChange] = useState(true);
  const [err, setErr] = useState();
  const initialState = {
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    edad: user?.edad || "",
    telefono: user?.telefono || ""
  };

  const { state, onInputChange, onResetForm } = useForm(initialState);
  const { nombre, apellido, edad, telefono } = state;

  useEffect(() => {
    if (!user?.userId) {
      return navigate("/");
    }
    document.title = "Mi Perfil - JB Premium - Vinos Españoles - Distribuidor Oficial"

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const verificarForm = verifyForm(state, "modify-user");

    if (verificarForm.estado === "error") {
      setErr(verificarForm.error);
      return;
    }

    setErr();
    onResetForm();

    console.log(verificarForm)

    const data = await putUser(user?.userId, setLoading, verificarForm.values);

    if (data.estado === "error") {
      toast.error(data.mensaje)
      return
    } else if (data.message === "Failed to fetch") {
      toast.warning("Hubo un error con el servidor. Intente más tarde.");
      return;
    }

    toast.success(`${data.mensaje} Inicia sesión nuevamente.`)
    postLogOut(toast, setLoading)
    setTimeout(() => {
      navigate("/inicio-sesion")
    }, 500)
  };

  return (
    <section className="profile">
      <p className="profile-title">Mi Perfil</p>
      <div className="profile-container">
        <div className="profile-box">
          <label className="profile-label" htmlFor="nombre">
            Nombre
          </label>
          <div>
            <input
              className="profile-input"
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              disabled={change}
              onChange={onInputChange}
            />
            <p className="profile-error">{err ? err.nombre : ""}</p>
          </div>
        </div>
        <div className="profile-box">
          <label className="profile-label" htmlFor="apellido">
            Apellido
          </label>
          <div>
            <input
              className="profile-input"
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              disabled={change}
              onChange={onInputChange}
            />
            <p className="profile-error">{err ? err.apellido : ""}</p>
          </div>
        </div>
        <div className="profile-box">
          <label className="profile-label" htmlFor="edad">
            Edad
          </label>
          <div>
            <input
              className="profile-input"
              type="number"
              id="edad"
              name="edad"
              value={edad}
              disabled={change}
              onChange={onInputChange}
            />
            <p className="profile-error">{err ? err.edad : ""}</p>
          </div>
        </div>
        <div className="profile-box">
          <label className="profile-label" htmlFor="telefono">
            telefono
          </label>
          <div>
            <input
              className="profile-input"
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              disabled={change}
              onChange={onInputChange}
            />
            <p className="profile-error">{err ? err.telefono : ""}</p>
          </div>
        </div>
        <div className="profile-box">
          <label className="profile-label" htmlFor="email">
            Email
          </label>
          <input
            className="profile-input"
            type="text"
            value={user?.email}
            id="email"
            name="email"
            disabled
            readOnly
          />
        </div>
        <div className="profile-btns">
          {!change ? (
            <>
              <button className="profile-btn" onClick={handleSubmit}>
                Confirmar
              </button>
              <button
                className="profile-btn profile-btnOtherColor"
                onClick={() => setChange(!change)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="profile-btn"
                onClick={() => setChange(!change)}
                type="button"
              >
                Editar
              </button>
              <Link className="profile-btn profile-btnOtherColor" to="/">
                volver al inicio
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
