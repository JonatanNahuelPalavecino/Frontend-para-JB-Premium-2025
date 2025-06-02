import "./Filtros.scss"

export const Filtros = ({ setFilters, filtros }) => {
    const handleInputChange = (e) => {
      const {name, value} = e.target

      setFilters((prev) => {
        if (value === "") {
          
          const updated = { ...prev };
          //borra la propiedad con valor vacio
          delete updated[name];
          return updated;
        }
  
        return {
          ...prev,
          [name]: value,
        };
      });
    };
  
    return (
      <div className="filtros">
        {
          filtros.map((filtro) => (
          <div key={filtro.name} className="filtros-container">
            <label className="filtros-label">{filtro.name}</label>
            <select className="filtros-input" name={filtro.type} onChange={handleInputChange}>
              {
                filtro.datos.map((dato) => (
                  <option key={dato.name} className="filtros-label" value={dato.value}>{dato.name}</option>
                ))
              }
            </select>
          </div>
          ))
        }
      </div>
    );
  };