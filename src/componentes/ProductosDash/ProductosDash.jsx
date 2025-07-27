import { useContext, useEffect, useState } from "react";
import "./ProductosDash.scss";
import { Context } from "../Context/Context";
import { getProducts } from "../utils/peticiones/getProducts";
import useForm from "../Hooks/useForm";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { ProductoDash } from "../ProductoDash/ProductoDash";
import { deleteProduct } from "../utils/peticiones/deleteProduct";
import { useNavigate } from "react-router-dom";

export const ProductosDash = () => {
  const { setLoading } = useContext(Context);
  const [products, setProducts] = useState([]); // Inicializar como array vacío
  const [allProducts, setAllProducts] = useState([]); // Nuevo estado para guardar todos los usuarios
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [type, setType] = useState(null);
  const [reload, setReload] = useState(false)

  const initialState = {
    nombre: "",
    activo: "",
    accesorio: "",
    porcDesc: "",
    destacado: "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState); // Añadir resetForm del hook

  const { nombre, activo, accesorio, porcDesc, destacado } = state;
  const navigate = useNavigate()

  const fetchProducts = async (filters = {}) => {
    setIsLoading(true);
    try {
      const res = await getProducts(filters);
      setProducts(res.products);

      if (Object.keys(filters).length === 0) {
        const res = await getProducts({});
        setAllProducts(res.products);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Gestión de Productos - JB Premium - Vinos Españoles - Distribuidor Oficial";
    fetchProducts(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, reload]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters(state);
  };

  const deleteFilters = () => {
    onResetForm();
    setFilters({});
    setProducts(allProducts);
  };

  const handleDelete = () => {
    deleteProduct(productSelected?.productoId, setLoading)
      .then(() => {
        setOpen(false)
        setReload(!reload)
      })
  }

  return (
    <>
      <section className="productsDash">
        <h2 className="productsDash-title">Crea tu Producto</h2>
        <div className="productsDash-content">
            <button onClick={() => navigate("/dashboard/crear-producto")} className="productsDash-btn" type="button">
              Crear
            </button>
        </div>
      </section>
      <section className="productsDash">
        <h2 className="productsDash-title">Total de Productos</h2>
        <div className="productsDash-content">
          <div className="productsDash-box">
            <span className="productsDash-boxTitulo">
              Total de productos Registrados
            </span>
            <span className="productsDash-boxNumero">
              {allProducts?.length}
            </span>
          </div>
          <div className="productsDash-box productsDash-boxOtherColor">
            <span className="productsDash-boxTitulo">
              Total de Productos Activos
            </span>
            <span className="productsDash-boxNumero">
              {allProducts?.filter((product) => product?.activo).length}
            </span>
          </div>
          <div className="productsDash-box">
            <span className="productsDash-boxTitulo">
              Total de Productos Inactivados
            </span>
            <span className="productsDash-boxNumero">
              {allProducts?.filter((product) => !product?.activo).length}
            </span>
          </div>
          <div className="productsDash-box productsDash-boxOtherColor">
            <span className="productsDash-boxTitulo">
              Total de Productos con Descuento
            </span>
            <span className="productsDash-boxNumero">
              {allProducts?.filter((product) => product?.porcDesc > 0).length}
            </span>
          </div>
          <div className="productsDash-box">
            <span className="productsDash-boxTitulo">Total de Accesorios</span>
            <span className="productsDash-boxNumero">
              {allProducts?.filter((product) => product?.accesorio).length}
            </span>
          </div>
        </div>
        <form className="productsDash-form" onSubmit={handleSubmit}>
          <div className="productsDash-formBox">
            <label className="productsDash-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="productsDash-input"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={onInputChange}
            />
          </div>
          <div className="productsDash-formBox">
            <label className="productsDash-label" htmlFor="activo">
              Activo
            </label>
            <select
              name="activo"
              id="activo"
              className="productsDash-input"
              value={activo}
              onChange={onInputChange}
            >
              <option className="productsDash-label" value="">
                Ver todos
              </option>
              <option className="productsDash-label" value={1}>
                Filtrar productos activos
              </option>
              <option className="productsDash-label" value={0}>
                Filtrar productos inactivos
              </option>
            </select>
          </div>
          <div className="productsDash-formBox">
            <label className="productsDash-label" htmlFor="accesorio">
              Accesorio
            </label>
            <select
              name="accesorio"
              id="accesorio"
              className="productsDash-input"
              value={accesorio}
              onChange={onInputChange}
            >
              <option className="productsDash-label" value="">
                Ver todos
              </option>
              <option className="productsDash-label" value={1}>
                Filtrar por accesorios
              </option>
              <option className="productsDash-label" value={0}>
                Filtrar por vinos
              </option>
            </select>
          </div>
          <div className="productsDash-formBox">
            <label className="productsDash-label" htmlFor="porcDesc">
              Porcentaje de Descuento
            </label>
            <select
              name="porcDesc"
              id="porcDesc"
              className="productsDash-input"
              value={porcDesc}
              onChange={onInputChange}
            >
              <option className="productsDash-label" value="">
                Ver todos
              </option>
              <option className="productsDash-label" value={1}>
                Filtrar productos con descuento
              </option>
              <option className="productsDash-label" value={0}>
                Filtrar productos sin descuento
              </option>
            </select>
          </div>
          <div className="productsDash-formBox">
            <label className="productsDash-label" htmlFor="destacado">
              Producto Destacado
            </label>
            <select
              name="destacado"
              id="destacado"
              className="productsDash-input"
              value={destacado}
              onChange={onInputChange}
            >
              <option className="productsDash-label" value="">
                Ver todos
              </option>
              <option className="productsDash-label" value={1}>
                Filtrar productos destacados
              </option>
              <option className="productsDash-label" value={0}>
                Filtrar productos no destacados
              </option>
            </select>
          </div>
          <div className="productsDash-formBtns">
            <button className="productsDash-btn" type="submit">
              Buscar
            </button>
            <button
              className="productsDash-btn productsDash-btnOtherColor"
              type="button"
              onClick={deleteFilters}
            >
              Borrar Filtros
            </button>
          </div>
        </form>
        <ul className="productsDash-container">
          <ProductoDash
            products={products}
            isLoading={isLoading}
            error={error}
            setProductSelected={setProductSelected}
            setType={setType}
            setOpen={setOpen}
          />
        </ul>
      </section>
      <ModalContainer open={open} onClose={() => setOpen(false)}>
        {type === "ver_foto" ? (
          <img
            className="productsDash-modalImg"
            src={productSelected?.foto}
            alt={productSelected?.nombre}
          />
        ) : type === "ver_pdf" ? (
          <iframe
            className="productsDash-modalPdf"
            src={productSelected?.pdf}
          />
        ) : type === "ver_fotoPromo" ? (
          <img
            className="productsDash-modalImg"
            src={productSelected?.fotoPromo}
            alt={productSelected?.nombre}
          />
        ) : (
          <div className="productsDash-modal">
            <p className="productsDash-modalTitle">
              ¿Estás seguro que querés eliminar el producto <b>{productSelected?.nombre}</b>?
            </p>
            <div className="productsDash-modalBtns">
              <button onClick={() => setOpen(false)} className="productsDash-modalBtn">
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="productsDash-modalBtn productsDash-modalBtnDelete"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </ModalContainer>
    </>
  );
};


//AGREGAR FUNCION PARA ELIMINAR EL PRODUCTO Y CREAR UN PRODUCTO
//AGREGAR COMPONENTE Y FUNCION QUE ME LLEVE A MODIFICAR EL PRODUCTO