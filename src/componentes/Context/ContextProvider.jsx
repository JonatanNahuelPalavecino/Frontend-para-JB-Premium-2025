import { Context } from "./Context";
import { useState } from "react";

export const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});

  const isInCart = (id) => {
    return cart.some((item) => item.productoId === id);
  };

  const totalCart = (moneda) => {
    if (moneda === "ARS") {
      return cart.reduce(
        (acumulador, producto) =>
          acumulador + producto.cantidad * producto.precioEnPesos,
        0
      );
    }

    return cart.reduce(
      (acumulador, producto) =>
        acumulador + producto.cantidad * producto.precio,
      0
    );
  };

  const updateItemToCart = (productoId, nuevaCantidad) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productoId === productoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const addToCart = (producto, cantidad, notify) => {
    if (cantidad === 0) {
      notify.error("Debes seleccionar una cantidad");
      return;
    }

    const product = {
      productoId: producto?.productoId,
      nombre: producto?.nombre,
      cantidad: cantidad,
      precio:
        producto?.porcDesc > 0
          ? producto?.precio - producto?.precio * (producto?.porcDesc / 100)
          : producto?.precio,
      precioEnPesos:
        producto?.porcDesc > 0
          ? producto?.precioEnPesos -
            producto?.precioEnPesos * (producto?.porcDesc / 100)
          : producto?.precioEnPesos,
      foto: producto?.foto,
      stock_disponible: producto?.stock_disponible,
    };

    if (!isInCart(producto?.productoId)) {
      setCart((prev) => [...prev, product]);
      notify.success("Producto agregado al carrito");
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  const deleteItemsCart = (productoId) => {
    return setCart((prev) => prev.filter((p) => p.productoId !== productoId));
  };

  const calcularDescuento = (precio, porcDesc) => {
    return Math.round(precio - precio * (porcDesc / 100));
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        cart,
        setCart,
        addToCart,
        totalCart,
        updateItemToCart,
        emptyCart,
        isInCart,
        deleteItemsCart,
        order,
        setOrder,
        calcularDescuento,
      }}
    >
      {children}
    </Context.Provider>
  );
};
