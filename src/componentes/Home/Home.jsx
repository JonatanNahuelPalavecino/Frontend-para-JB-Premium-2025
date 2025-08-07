import React, { useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import { Slider } from "../Slider/Slider";
import { BodegasContainer } from "../BodegasContainer/BodegasContainer";
import { FlyerEnvio } from "../Flyer/FlyerEnvio";
import { bodegas } from "../utils/datos/bodegas";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./Home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filters: {} }),
  };

  const url = import.meta.env.VITE_SERVER;
  const { data, error, loading, fetchData } = useFetch();

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });

    document.title =
      "Inicio - JB Premium - Vinos Españoles - Distribuidor Oficial";

    fetchData(`${url}/products/filters`, parameters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productosPromo =
    data?.products?.filter(
      (producto) => producto.promocion == true && producto.fotoPromo
    ) || [];

  return (
    <>
      <Slider />

      {productosPromo?.length > 0 && (
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            // autoplay: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            interval: 4000,
            rewind: true,
          }}
          className="sliderPromo"
        >
          {productosPromo.map((producto) => (
            <SplideSlide className="sliderPromo-item" key={producto.productoId}>
              <div className="sliderPromo-content">
                <img
                  src={producto.fotoPromo}
                  alt={producto.nombre}
                  className="sliderPromo-img"
                />
                {producto.stock_disponible > 0 && (
                  <Link
                    className="sliderPromo-btn"
                    to={`/detalle/${producto.productoId}`}
                  >
                    Quiero ver
                  </Link>
                )}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}

      {bodegas.map((bodega) => {
        const productosFiltrados = data?.products
          ? data.products.filter(
              (producto) => producto.bodega === bodega.nombre
            )
          : [];

        return (
          <BodegasContainer
            key={bodega.id}
            bodega={{ img: bodega.logo, name: bodega.nombre }}
            flyer={{ img: bodega.flyer, name: bodega.nombre }}
            productos={productosFiltrados}
            loading={loading}
            error={error}
          />
        );
      })}
      <FlyerEnvio bodegas={bodegas} />
    </>
  );
};
