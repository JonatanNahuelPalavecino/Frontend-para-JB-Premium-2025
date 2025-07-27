import { useEffect, useState } from "react";
import "./MetricasDash.scss";
import { getVisitsWithProducts } from "../utils/peticiones/postVisit";
import { GraficoBarras } from "../GraficoBarras/GraficoBarras";
import { getAgeForUsers, getLocalWithMostSell, getProductMostSell, getSeccionWithMoreVisit } from "../utils/peticiones/getProductMostSell";

export const MetricasDash = () => {
  const [prodVisit, setProdVisit] = useState([]);
  const [prodVendido, setProdVendido] = useState([]);
  const [localMasVend, setLocalMasVend] = useState([]);
  const [ageMasUsers, setAgeMasUsers] = useState([]);
  const [seccionMasVisit, setSeccionMasVisit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resProdVisit, resProdVendido, resLocalMasVend, resAgeMasUsers, resSeccionMasVisit] = await Promise.all([
        getVisitsWithProducts(),
        getProductMostSell(),
        getLocalWithMostSell(),
        getAgeForUsers(),
        getSeccionWithMoreVisit()
      ]);

      setProdVisit(resProdVisit);
      setProdVendido(resProdVendido);
      setLocalMasVend(resLocalMasVend);
      setAgeMasUsers(resAgeMasUsers);
      setSeccionMasVisit(resSeccionMasVisit)
    } catch (error) {
      console.error("Error fetching visitas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Métricas - JB Premium - Vinos Españoles - Distribuidor Oficial";

    fetchData();
  }, []);

  return (
    <section className="metricas-container">
      <h2>Productos más visitados</h2>
      <GraficoBarras
        data={prodVisit}
        isLoading={isLoading}
        xKey={"name"}
        yKey={"visitas"}
      />
      <h2>Productos más vendidos</h2>
      <GraficoBarras
        data={prodVendido}
        isLoading={isLoading}
        xKey={"nombre"}
        yKey={"cantidad"}
      />
      <h2>Provincia con más compras</h2>
      <GraficoBarras
        data={localMasVend}
        isLoading={isLoading}
        xKey={"localidad"}
        yKey={"cantidad"}
      />
      <h2>Cantidad de usuarios por edad</h2>
      <GraficoBarras
        data={ageMasUsers}
        isLoading={isLoading}
        xKey={"edad"}
        yKey={"total"}
      />
      <h2>Sección con más visitas</h2>
      <GraficoBarras
        data={seccionMasVisit}
        isLoading={isLoading}
        xKey={"seccion"}
        yKey={"total"}
      />
    </section>
  );
};
