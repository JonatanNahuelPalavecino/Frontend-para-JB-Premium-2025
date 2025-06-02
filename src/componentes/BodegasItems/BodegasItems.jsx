import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import { Item } from "../Item/Item";
import "./BodegasItems.scss"
import { useCotDolar } from "../Hooks/useCotDolar";
import {SkeletonComponent} from "../SkeletonComponent/SkeletonComponent";

export const BodegasItems = ({productos, bodega, loading}) => {

  const { dolarOficial } = useCotDolar(0);

  productos = productos.filter(producto => producto.activo)

  return (
    <Splide
    options={{
        type: "loop",
        perPage: bodega === "Clunia" ? 2 : 3,
        autoplay: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        interval: 4000,
        rewind: true,
        breakpoints: {
          1024: { perPage: 2 }, // Tablets
          768: { perPage: 1 },  // Móviles
        },
      }}
    >
      {
        loading
        ?
        (
            [...Array(3)].map((_, index) => (
                <SplideSlide className="bodegasItems" key={index}>
                  <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                    <SkeletonComponent width={"300px"} height={"350px"}/>
                    <SkeletonComponent width={"300px"} height={"200px"}/>
                  </div>
                </SplideSlide>
              ))
        )
        :
        (
            productos.map((producto) => (
                <SplideSlide className="bodegasItems" key={producto.productoId}>
                    <Item {...producto} dolarOficial={dolarOficial}/>
                </SplideSlide>
            ))
        )
      }
    </Splide>
  )
}
