import { useEffect, useState } from "react";
import { getProductoByFilters } from "../utils/peticiones/getProductoByFilters";
import { Filtros } from "../Filtros/Filtros";
import { FlyerEnvio } from "../Flyer/FlyerEnvio";
import { bodegas } from "../utils/datos/bodegas";
import { Productos } from "../Productos/Productos";

export const ProductosContainer = () => {
  const url = import.meta.env.VITE_SERVER;
  const [vinos, setVinos] = useState([]);
  const [accesorios, setAccesorios] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const obtenerVinosPorFiltro = () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      };
      getProductoByFilters(options, setVinos, setError, url, setIsLoading);
    };

    obtenerVinosPorFiltro();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters: {} }),
    };
    const obtenerAccesoriosPorFiltro = () => {
      getProductoByFilters(options, setAccesorios, setError, url, setIsLoading)
    }

    obtenerAccesoriosPorFiltro()
    document.title = "Productos - JB Premium - Vinos Españoles - Distribuidor Oficial"

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtros =  [
    {
      name: "Filtrar por Bodega", 
      type: "bodega",
      datos: [
        {name: "Elige una opción", value: ""},
        {name: "Protos", value: "Protos"},
        {name: "Herederos de Marqués de Riscal", value: "Herederos de Marqués de Riscal"},
        {name: "Martín Códax", value: "Martín Códax"},
        {name: "Príncipe de Viana", value: "Príncipe de Viana"},
        {name: "Clunia", value: "Clunia"},
      ]
    },
    {
      name: "Filtrar por Tipo de Vino", 
      type: "vino",
      datos: [
        {name: "Elige una opción", value: ""},
        {name: "Vino Tinto", value: "tinto"},
        {name: "Vino Blanco", value: "blanco"},
        {name: "Vino Rosado", value: "rosado"},
        {name: "Vino Espumante", value: "espumoso"},
      ]
    },
  ]

  return (
    <main className="productos">
      <p className="productos-title">Nuestros Productos</p>
      <hr />
      <Filtros setFilters={setFilters}  filtros={filtros}/>
      <div className="productos-container">
        <Productos isLoading={isLoading} error={error} productos={vinos} type={"vinos"}/>
        <Productos isLoading={isLoading} error={error} productos={accesorios} type={"accesorios"}/>
      </div>
      <FlyerEnvio bodegas={bodegas} />
    </main>
  );
};

