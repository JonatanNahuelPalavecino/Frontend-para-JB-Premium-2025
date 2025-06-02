import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useForm from "../Hooks/useForm";
import { countVisit } from "../utils/peticiones/postVisit";
import "./GrafVisitas.scss";
import { Link } from "react-router-dom";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";

export const GrafVisitas = () => {
  const theme = useTheme();
  const [visitas, setVisitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const initialState = {
    desde: dayjs().subtract(14, "day").format("YYYY-MM-DD"),
    hasta: dayjs().format("YYYY-MM-DD"),
  };

  const { state, onInputChange } = useForm(initialState);
  const { desde, hasta } = state;

  const fetchVisitas = async (f1, f2) => {
    setIsLoading(true); // Activar carga
    try {
      const res = await countVisit(f1, f2);
      if (res.estado !== "error") {
        setVisitas(res);
      } else {
        console.error(res.mensaje);
      }
    } catch (error) {
      console.error("Error fetching visitas:", error);
    } finally {
      setIsLoading(false); // Desactivar carga
    }
  };

  useEffect(() => {
    fetchVisitas(desde, hasta);
  }, [desde, hasta]);

  // Ordenar por fecha más antigua primero
  const visitasOrdenadas = [...visitas].sort((a, b) => {
    const [diaA, mesA, anioA] = a.dia.split("/").map(Number);
    const [diaB, mesB, anioB] = b.dia.split("/").map(Number);

    const fechaA = new Date(anioA, mesA - 1, diaA);
    const fechaB = new Date(anioB, mesB - 1, diaB);

    return fechaA - fechaB;
  });

  const dias = visitasOrdenadas.map((v) => v.dia);
  const maxVisitas = Math.max(...visitasOrdenadas.map((v) => v.visitas), 50);
  const maxY = Math.ceil(maxVisitas / 5) * 5;
  const dynamicHeight = Math.max(400, maxVisitas * 10);

  return (
    <section className="grafVisitas">
      <form className="grafVisitas-form">
        <div className="grafVisitas-box">
          <label className="grafVisitas-label" htmlFor="desde">
            Desde
          </label>
          <input
            className="grafVisitas-input"
            type="date"
            value={desde}
            name="desde"
            onChange={onInputChange}
          />
        </div>
        <div className="grafVisitas-box">
          <label className="grafVisitas-label" htmlFor="hasta">
            Hasta
          </label>
          <input
            className="grafVisitas-input"
            type="date"
            value={hasta}
            name="hasta"
            onChange={onInputChange}
          />
        </div>
      </form>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Total de Visitas por Día
      </Typography>
      <Box sx={{ width: "100%" }}>
        {isLoading ? (
          <SkeletonComponent width={"100%"} height={"500px"}/>
        ) : (
          // Mostrar gráfico cuando los datos están listos
          <LineChart
            dataset={visitasOrdenadas}
            height={dynamicHeight}
            margin={{
              top: 16,
              right: 20,
              left: 70,
              bottom: 80,
            }}
            xAxis={[
              {
                scaleType: "point",
                data: dias,
                tickLabelStyle: {
                  ...theme.typography.body2,
                  angle: -45,
                  textAnchor: "end",
                },
                label: "Fecha",
                labelStyle: {
                  ...theme.typography.body1,
                  fill: theme.palette.text.primary,
                },
              },
            ]}
            yAxis={[
              {
                label: "Cantidad de visitas",
                min: 0,
                max: maxY,
                tickInterval: 5,
                labelStyle: {
                  ...theme.typography.body1,
                  fill: theme.palette.text.primary,
                },
                tickLabelStyle: theme.typography.body2,
              },
            ]}
            series={[
              {
                dataKey: "visitas",
                showMark: true,
                color: "rgb(212, 175, 55)",
              },
            ]}
            sx={{
              [`.${axisClasses.root} line`]: {
                stroke: theme.palette.text.secondary,
              },
              [`.${axisClasses.root} text`]: {
                fill: theme.palette.text.secondary,
              },
              [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translateX(-30px)",
              },
            }}
            animation={{
              duration: 1000,
              easing: "easeOutCubic",
            }}
          />
        )}
      </Box>
      <Link className="grafVisitas-btn" to="/dashboard/metricas">
        Ver más metricas
      </Link>
    </section>
  );
};