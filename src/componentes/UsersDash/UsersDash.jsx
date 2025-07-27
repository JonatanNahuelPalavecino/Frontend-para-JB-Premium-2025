import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/peticiones/getUsers";
import "./UsersDash.scss";
import { User } from "../User/User";
import useForm from "../Hooks/useForm";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { Context } from "../Context/Context";
import { activateUser } from "../utils/peticiones/activateUser";
import { toast } from "sonner";
import { desactivateUser } from "../utils/peticiones/desactivateUser";

export const UsersDash = () => {
  const { setLoading } = useContext(Context);
  const [users, setUsers] = useState([]); // Inicializar como array vacío
  const [allUsers, setAllUsers] = useState([]); // Nuevo estado para guardar todos los usuarios
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const initialState = {
    nombre: "",
    apellido: "",
    email: "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState); // Añadir resetForm del hook

  const { nombre, apellido, email } = state;

  const fetchUsers = async (filters = {}) => {
    setIsLoading(true);
    try {
      const res = await getUsers(filters);
      setUsers(res.users);
      // Guardar todos los usuarios la primera vez
      if (Object.keys(filters).length === 0) {
        setAllUsers(res.users);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(filters);
      document.title = "Gestión de Usuarios - JB Premium - Vinos Españoles - Distribuidor Oficial";

  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters(state);
  };

  const activarUsuario = async (email, setLoading) => {
    const res = await activateUser(email, setLoading);
    if (res.estado === "error") {
      toast.error(res.mensaje);
      return;
    } else if (!res.estado) {
      toast.error("Hubo un error con el servidor. Intente más tarde.");
      return;
    }
    setOpen(false);
    toast.success(res.mensaje);
    fetchUsers();
  };

  const desactivarUsuario = async (email, setLoading) => {
    const res = await desactivateUser(email, setLoading);
    if (res.estado === "error") {
      toast.error(res.mensaje);
      return;
    } else if (!res.estado) {
      toast.error("Hubo un error con el servidor. Intente más tarde.");
      return;
    }
    setOpen(false);
    toast.success(res.mensaje);
    fetchUsers();
  };

  const deleteFilters = () => {
    onResetForm(); // Usar resetForm del hook useForm
    setFilters({});
    setUsers(allUsers); // Restablecer a todos los usuarios
  };

  return (
    <>
      <section className="usersDash">
        <h2 className="usersDash-title">Total de Usuarios</h2>
        <div className="usersDash-content">
          <div className="usersDash-box">
            <span className="usersDash-boxTitulo">
              Total de Usuarios Registrados
            </span>
            <span className="usersDash-boxNumero">{allUsers?.length}</span>
          </div>
          <div className="usersDash-box usersDash-boxOtherColor">
            <span className="usersDash-boxTitulo">
              Total de Usuarios Activos
            </span>
            <span className="usersDash-boxNumero">
              {allUsers?.filter((user) => user?.orders?.length > 0).length}
            </span>
          </div>
          <div className="usersDash-box">
            <span className="usersDash-boxTitulo">
              Total de Usuarios Desactivados
            </span>
            <span className="usersDash-boxNumero">
              {allUsers?.filter((user) => !user?.activo).length}
            </span>
          </div>
        </div>
        <form className="usersDash-form" onSubmit={handleSubmit}>
          <div className="usersDash-formBox">
            <label className="usersDash-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="usersDash-input"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={onInputChange}
            />
          </div>
          <div className="usersDash-formBox">
            <label className="usersDash-label" htmlFor="apellido">
              Apellido
            </label>
            <input
              className="usersDash-input"
              type="text"
              name="apellido"
              id="apellido"
              value={apellido}
              onChange={onInputChange}
            />
          </div>
          <div className="usersDash-formBox">
            <label className="usersDash-label" htmlFor="email">
              Email
            </label>
            <input
              className="usersDash-input"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="usersDash-formBtns">
            <button className="usersDash-btn" type="submit">
              Buscar
            </button>
            <button
              className="usersDash-btn usersDash-btnOtherColor"
              type="button"
              onClick={deleteFilters}
            >
              Borrar Filtros
            </button>
          </div>
        </form>
        <ul className="usersDash-container">
          <User
            users={users}
            isLoading={isLoading}
            error={error}
            setUserSelected={setUserSelected}
            setOpen={setOpen}
          />
        </ul>
      </section>
      <ModalContainer open={open} onClose={() => setOpen(false)}>
        {userSelected?.activo ? (
          <div className="usersDash-modal">
            <p className="usersDash-modalTitle">
              ¿Estas seguro que deseas desactivar el usuario{" "}
              {userSelected?.email}?
            </p>
            <button
              className="usersDash-modalBtn usersDash-modalBtnOtherColor"
              onClick={() => desactivarUsuario(userSelected?.email, setLoading)}
            >
              Desactivar
            </button>
          </div>
        ) : (
          <div className="usersDash-modal">
            <p className="usersDash-modalTitle">
              ¿Estas seguro que deseas activar el usuario {userSelected?.email}?
            </p>
            <button
              className="usersDash-modalBtn"
              onClick={() => activarUsuario(userSelected?.email, setLoading)}
            >
              Activar
            </button>
          </div>
        )}
      </ModalContainer>
    </>
  );
};
