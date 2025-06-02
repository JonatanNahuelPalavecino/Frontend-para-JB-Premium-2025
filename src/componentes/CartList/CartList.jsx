import { useContext, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa'
import { Context } from "../Context/Context";
import "./CartList.scss"
import { ItemCount } from "../ItemCount/ItemCount";

export const CartList = ({ productoId, nombre, cantidad, precio, foto, stock_disponible }) => {
  const { deleteItemsCart, updateItemToCart } = useContext(Context);
  const [counter, setCounter] = useState(cantidad)

  const handleChangeCant = (nuevaCantidad) => {
    setCounter(nuevaCantidad)
    updateItemToCart(productoId, nuevaCantidad)
  }

  return (
    <div className="cart">
      <div className="cart-boxImg">
        <img className="cart-img" src={foto} alt={nombre} />
      </div>
      <p className="cart-desc">
        <strong>Producto: </strong>
        {nombre}
      </p>
      <p className="cart-desc">
        <strong>Precio:</strong> AR$ {precio} c/u
      </p>
      <ItemCount
        max={stock_disponible}
        min={1}
        counter={counter}
        setCounter={handleChangeCant}
      />
      <FaTrashAlt
        className="cart-trash"
        onClick={() => deleteItemsCart(productoId)}
      />
    </div>
  );
};
