import { useEffect, useState } from "react";
import "./Accesorios.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import { useCotDolar } from "../Hooks/useCotDolar";
import { Item } from "../Item/Item";
import { getAccesorios } from "../utils/peticiones/getAccesorios";

export const Accesorios = () => {
  const { dolarOficial } = useCotDolar(0);
  const url = import.meta.env.VITE_SERVER;
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filters: { accesorio: true } }),
  };

  useEffect(() => {
    const obtenerAccesorios = () => {
      getAccesorios(options, setData, setError, url)
    }

    obtenerAccesorios()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error ? (
        <div className="accesorios-container">
          <p>Hubo un error en el servidor. Intente mas tarde.</p>
        </div>
      ) : (
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            autoplay: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            interval: 4000,
            rewind: true,
            breakpoints: {
              1024: { perPage: 2 }, // Tablets
              768: { perPage: 1 }, // Móviles
            },
          }}
        >
          {data?.products?.map((producto) => (
            <SplideSlide className="bodegasItems" key={producto.productoId}>
              <Item {...producto} dolarOficial={dolarOficial} />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </>
  );
};
