import dayjs from "dayjs";
import { getIp } from "./getIp";

export const postVisit = async (url, location, user) => {
  try {
    const ip = await getIp();
    const result = await fetch(`${url}/visit/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters: {
          ruta: location,
          user_agent: navigator.userAgent,
          referer: document.referrer,
          userId: user?.userId || null,
          ip: ip,
        },
      }),
    });
    const data = await result.json();
    localStorage.setItem("visita", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const countVisit = async (desde, hasta) => {
  const url = import.meta.env.VITE_SERVER;
  const visitasPorDia = [];

  try {
    let currentDate = dayjs(desde);
    const endDate = dayjs(hasta);

    // CORREGIDO: avanzar mientras currentDate es igual o menor a endDate
    while (
      currentDate.isSame(endDate, "day") ||
      currentDate.isBefore(endDate)
    ) {
      const desdeDia = currentDate.startOf("day").toDate(); // 00:00:00
      const hastaDia = currentDate.endOf("day").toDate(); // 23:59:59

      const response = await fetch(`${url}/visit/total`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          filters: {
            fecha: {
              gte: desdeDia,
              lte: hastaDia,
            },
          },
        }),
      });

      const data = await response.json();

      if (data.estado === "success") {
        visitasPorDia.push({
          dia: currentDate.format("DD/MM/YYYY"),
          visitas: data.total || 0,
        });
      } else {
        console.error(
          "Error trayendo visitas para",
          currentDate.format("DD/MM/YYYY")
        );
      }

      currentDate = currentDate.add(1, "day"); // SUMAR un día
    }

    return visitasPorDia;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVisitsWithProducts = async () => {
  const url = import.meta.env.VITE_SERVER;
  try {
    const response = await fetch(`${url}/visit/get-all-visits`, {
      credentials: "include",
    });

    const data = await response.json();

    const visitasFiltradas = data?.visits?.filter(
      (visit) => visit?.productoNombre !== null
    );

    // Agrupar y contar visitas por productoNombre
    const conteo = {};

    visitasFiltradas?.forEach((visit) => {
      const nombre = visit?.productoNombre;
      conteo[nombre] = (conteo[nombre] || 0) + 1;
    });

    // Convertir el conteo a un array
    const resultado = Object.entries(conteo).map(([name, visitas]) => ({
      name,
      visitas,
    }));

    // Ordenar por cantidad de visitas descendente (opcional)
    resultado.sort((a, b) => b.visitas - a.visitas);

    return resultado;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllVisits = async () => {
  const url = import.meta.env.VITE_SERVER;

  try {
    const response = await fetch(`${url}/visit/get-all-visits`, {
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
