import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "./Slider.scss";
import { images } from "../utils/datos/images";

export const Slider = () => {
 

  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;

      const handleVisible = (slide) => {
        const textElement = slide.slide.querySelector(".slider-box");
        if (textElement) {
          textElement.classList.add("active");
        }
      };

      const handleHidden = (slide) => {
        const textElement = slide.slide.querySelector(".slider-box");
        if (textElement) {
          textElement.classList.remove("active");
        }
      };

      splide.on("visible", handleVisible);
      splide.on("hidden", handleHidden);

      const firstSlide = splide.Components.Slides.getAt(0);
      if (firstSlide) {
        handleVisible(firstSlide);
      }

      return () => {
        splide.off("visible", handleVisible);
        splide.off("hidden", handleHidden);
      };
    }
  }, []);

  return (
    <div className="slider">
      <Splide
        ref={splideRef}
        className="slider-container"
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          pauseOnFocus: false,
          pauseOnHover: false,
          interval: 4000,
          arrows: false,
          pagination: false,
          rewind: true,
        }}
      >
        {images.map((el) => (
          <SplideSlide key={el.name} className="slider-img">
            <div className="slider-content">
              {el.type === "jpg" ? (
                <img className="slider-media" src={el.src} alt={el.name} />
              ) : (
                <video className="slider-media" autoPlay loop muted playsInline>
                  <source src={el.src} type="video/mp4" />
                </video>
              )}
              <div className="slider-box">
                <div className="slider-textOne">
                  <p>{el.title}</p>
                </div>
                <div className="slider-textTwo">
                  <p>{el.subtitle}</p>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
