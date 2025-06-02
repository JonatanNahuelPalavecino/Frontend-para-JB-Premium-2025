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

  const totalCart = () => {
    return cart.reduce(
      (acumulador, producto) =>
        acumulador + producto.cantidad * producto.precio,
      0
    );
  };

  const updateItemToCart = (productoId, nuevaCantidad) => {
    setCart(prevCart =>
        prevCart.map(item =>
          item.productoId === productoId
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
  }

  const addToCart = (producto, cantidad, precioFinal, notify) => {
    if (cantidad === 0) {
      notify.error("Debes seleccionar una cantidad");
      return;
    }

    const product = {
      productoId: producto?.productoId,
      nombre: producto?.nombre,
      cantidad: cantidad,
      precio: producto?.porcDesc > 0 ? precioFinal - precioFinal * (producto?.porcDesc / 100) : precioFinal,
      foto: producto?.foto,
      stock_disponible: producto?.stock_disponible
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
