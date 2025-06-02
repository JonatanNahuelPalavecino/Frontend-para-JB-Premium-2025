import { GrafVisitas } from "../GrafVisitas/GrafVisitas";
import { PanelStatus } from "../PanelStatus/PanelStatus";
import "./HomeDash.scss"

export const HomeDash = () => {

  return (
    <main className="homeDash">
      <h2  className="homeDash-title">Inicio</h2>
      <PanelStatus/>
      <GrafVisitas />
    </main>
  );
};
