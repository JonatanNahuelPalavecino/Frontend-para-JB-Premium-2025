import "./GraficoBarras.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";

export const GraficoBarras = ({ data, isLoading, xKey, yKey }) => {
  const anchoPorBarra = 60;
  const anchoMinimo = 500; // ancho mínimo para que no se vea mal con pocos datos
  const chartWidth = Math.max(data.length * anchoPorBarra, anchoMinimo);

  return (
    <>
      {isLoading ? (
        <SkeletonComponent width={"100%"} height={"400px"} />
      ) : data.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            height: "450px",
          }}
        >
          <div style={{ width: chartWidth, height: "100%", margin: "0 auto" }}>
            <BarChart
              width={chartWidth}
              height={450}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xKey}
                angle={-30}
                textAnchor="end"
                interval={0}
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yKey} fill="#b19129" />
            </BarChart>
          </div>
        </div>
      )}
    </>
  );
};
