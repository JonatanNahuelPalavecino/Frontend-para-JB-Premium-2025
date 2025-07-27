export const putOrder = async (
  orderId,
  newOrder,
  newCart,
  newMetodoPago,
  setLoading
) => {
  setLoading(true);
  const url = import.meta.env.VITE_SERVER;

  const cartCasteado = newCart.map((item) => {
    const precioElegido =
      newMetodoPago === "mercado_pago" ? item.precioEnPesos : item.precio;

    return {
      ...item,
      precio: precioElegido,
    };
  });

  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      filters: {
        nuevaOrden: {
          direccion: newOrder.direccion,
          localidad: newOrder.localidad,
          provincia: newOrder.provincia,
          telefono: newOrder.telefono,
          codigoPostal: newOrder.codigoPostal,
        },
        nuevoCarrito: cartCasteado,
        nuevo_metodo_pago: {
          mercado_pago: newMetodoPago === "mercado_pago",
          pay_pal: newMetodoPago === "pay_pal",
        },
      },
    }),
  };

  try {
    const response = await fetch(`${url}/order/${orderId}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    setLoading(false);
  }
};
