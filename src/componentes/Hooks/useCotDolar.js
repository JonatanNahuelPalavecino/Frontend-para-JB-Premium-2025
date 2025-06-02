import { useEffect, useState } from 'react';

export const useCotDolar = () => {
  const [dolarOficial, setDolarOficial] = useState([]);
  const [firstApiFailed, setFirstApiFailed] = useState(false);

  useEffect(() => {
    fetch('https://dolarapi.com/v1/dolares/oficial')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.venta !== 0) {
          setDolarOficial(data.venta);
          // console.log("Resultado de la primer API: ", data.venta);
        } else {
          // Si el valor es cero, indica que la primera API ha fallado
          setFirstApiFailed(true);
        }
      })
      .catch(() => {
        // Manejar errores de la primera API
        setFirstApiFailed(true);
      });
  }, [dolarOficial]);

  useEffect(() => {
    // Llamar al segundo useEffect solo si la primera API ha fallado
    if (firstApiFailed) {
      fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setDolarOficial(data.oficial.value_sell);
          // console.log("Resultado de la segunda API: ", data.oficial.value_sell);
        })
        .catch(() => {
          // Manejar errores de la segunda API si es necesario
        });
    }
  }, [firstApiFailed]);

  return {
    dolarOficial,
  };
};