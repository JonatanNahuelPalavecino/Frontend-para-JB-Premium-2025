import { useEffect } from "react";
import { GrafVisitas } from "../GrafVisitas/GrafVisitas";
import { PanelStatus } from "../PanelStatus/PanelStatus";
import "./HomeDash.scss"

export const HomeDash = () => {

  useEffect(() => {
      document.title = "Dashboard - JB Premium - Vinos Españoles - Distribuidor Oficial";
  }, [])

  return (
    <main className="homeDash">
      <h2  className="homeDash-title">Inicio</h2>
      <PanelStatus/>
      <GrafVisitas />
    </main>
  );
};
