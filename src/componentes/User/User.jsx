import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import "./User.scss";

export const User = ({ users, isLoading, error, setUserSelected, setOpen }) => {

  const handleClick = (user) => {
    setUserSelected(user)
    setOpen(true)
  }
  
  return (
    <>
      {isLoading ? (
        [...Array(10)].map((_, index) => (
          <div
            key={index}
            style={{
              margin: ".5rem",
            }}
          >
            <SkeletonComponent width={"100%"} height={"100px"} />
          </div>
        ))
      ) : error ? (
        <li>Hubo un problemas con el servidor. Intente mas tarde</li>
      ) : users?.length === 0 ? (
        <li>No se encontraron resultados</li>
      ) : (
        users?.map((user) => (
          <li key={user.userId} className="user">
            <div className="user-box">
              <p className="user-title">Nombre</p>
              <input disabled className="user-desc" value={user.nombre} />
            </div>
            <div className="user-box">
              <p className="user-title">Apellido</p>
              <input disabled className="user-desc" value={user.apellido} />
            </div>
            <div className="user-box">
              <p className="user-title">Email</p>
              <input disabled className="user-desc" value={user.email} />
            </div>
            <div className="user-box">
              <p className="user-title">Telefono</p>
              <input disabled className="user-desc" value={user.telefono ? user.telefono : "No hay datos"} />
            </div>
            <div className="user-box">
              <p className="user-title">Edad</p>
              <p className="user-desc">{user.edad}</p>
            </div>
            <div className="user-box">
              <p className="user-title">Rol</p>
              <p className="user-desc">{user.rol}</p>
            </div>
            {user.activo === 1 ? (
              <button className="user-btn user-btnOtherColor" onClick={() => handleClick(user)}>Desactivar</button>
            ) : (
              <button className="user-btn" onClick={() => handleClick(user)}>Activar</button>
            )}
          </li>
        ))
      )}
    </>
  );
};
