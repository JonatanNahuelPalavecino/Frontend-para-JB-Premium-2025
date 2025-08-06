import "./ProductCreateDash.scss";
import useForm from "../Hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { createProduct } from "../utils/peticiones/createProduct";
import { Context } from "../Context/Context";

export const ProductCreateDash = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(Context);

  const [previewFoto, setPreviewFoto] = useState("https://res.cloudinary.com/dcyhxj1nn/image/upload/v1754487344/no-image-available-icon-vector_qdmgee_i89zvq.jpg");
  const [previewPdf, setPreviewPdf] = useState("https://res.cloudinary.com/dcyhxj1nn/image/upload/v1754487344/no-image-available-icon-vector_qdmgee_i89zvq.jpg");
  const [previewFotoPromo, setPreviewFotoPromo] = useState("https://res.cloudinary.com/dcyhxj1nn/image/upload/v1754487344/no-image-available-icon-vector_qdmgee_i89zvq.jpg");

  const initialState = {
    nombre: "",
    bodega: "",
    precio: "",
    activo: false,
    accesorio: false,
    porcDesc: "",
    destacado: false,
    promocion: false,
    stock_disponible: "",
    stock_total: "",
    foto: "",
    pdf: "",
    fotoPromo: "",
    cosecha: "",
    region: "",
    crianza: "",
    descUno: "",
    descDos: "",
    faseGus: "",
    faseVis: "",
    faseOlf: "",
    grado: "",
    maridaje: "",
    temp: "",
    tipo: "",
    ubicacion: "",
    vino: "",
    detalle: "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState);

  const datosPrincipales = [
    { name: "nombre", title: "Nombre", type: "text" },
    { name: "bodega", title: "Bodega", type: "text" },
    { name: "precio", title: "Precio (en USD)", type: "text" },
    { name: "activo", title: "Producto Activo", type: "checkbox" },
    { name: "accesorio", title: "¿Es un accesorio?", type: "checkbox" },
    { name: "porcDesc", title: "Porcentaje de Descuento", type: "text" },
    { name: "promocion", title: "¿Es una promoción?", type: "checkbox" },
    { name: "destacado", title: "Producto Destacado", type: "checkbox" },
    { name: "stock_disponible", title: "Stock Disponible", type: "text" },
    { name: "stock_total", title: "Stock Total", type: "text" },
    { name: "foto", title: "Foto del Producto", type: "file" },
  ];

  const datosGenerales = [
    { name: "cosecha", title: "Cosecha del vino", type: "text" },
    { name: "region", title: "Región de Origen", type: "text" },
    { name: "crianza", title: "Crianza", type: "text" },
    { name: "descUno", title: "1° Descripción", type: "text" },
    { name: "descDos", title: "2° Descripción", type: "text" },
    { name: "faseGus", title: "Fase Gustativa", type: "text" },
    { name: "faseVis", title: "Fase Visual", type: "text" },
    { name: "faseOlf", title: "Fase Olfativa", type: "text" },
    { name: "grado", title: "Grado Alcohólica", type: "text" },
    { name: "maridaje", title: "Maridaje", type: "text" },
    { name: "temp", title: "Temperatura de Servicio", type: "text" },
    { name: "tipo", title: "Tipo", type: "text" },
    { name: "ubicacion", title: "URL D.O", type: "text" },
    { name: "vino", title: "Vino", type: "text" },
    { name: "detalle", title: "Detalle (para accesorios)", type: "text" },
  ];

  useEffect(() => {
    document.title = "Creación de Productos - JB Premium - Vinos Españoles - Distribuidor Oficial";
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(state, setLoading, navigate);
    onResetForm();
    setPreviewFoto(null);
    setPreviewPdf(null);
    setPreviewFotoPromo(null);
  };

  const handleFileChange = (e) => {
    onInputChange(e);
    const file = e.target.files[0];
    const field = e.target.name;

    if (field === "foto" && file) setPreviewFoto(URL.createObjectURL(file));
    if (field === "pdf" && file) setPreviewPdf(URL.createObjectURL(file));
    if (field === "fotoPromo" && file) setPreviewFotoPromo(URL.createObjectURL(file));
  };

  return (
    <section className="productCreateDash">
      <h2 className="productCreateDash-title">Crear Producto</h2>
      <form className="productCreateDash-form" onSubmit={handleSubmit}>
        <h3 className="productCreateDash-formTitle">Datos Principales</h3>
        <fieldset className="productCreateDash-formContainer">
          {datosPrincipales.map((el, index) => {
            if (el.type === "file") {
              return (
                <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span className="productCreateDash-label">{el.title}</span>
                  <div className="productCreateDash-boxFile">
                    {el.name === "foto" && previewFoto && (
                      <img className="productCreateDash-boxFileImg" src={previewFoto} alt="Foto del producto" />
                    )}
                    <div className="productCreateDash-boxFileInput">
                      <label className="productCreateDash-labelInput" htmlFor={el.name}>
                        <input
                          className="productCreateDash-inputFile"
                          type="file"
                          accept="image/*"
                          name={el.name}
                          id={el.name}
                          onChange={handleFileChange}
                        />
                        <span>Selecciona el archivo</span>
                      </label>
                      <span className="productCreateDash-file">{state[el.name]?.name || "No hay ningún archivo."}</span>
                    </div>
                  </div>
                </div>
              );
            }

            if (el.type === "checkbox") {
              return (
                <div className="productCreateDash-box" key={index}>
                  <span className="productCreateDash-label">{el.title}</span>
                  <label className="productCreateDash-labelCheckbox" htmlFor={el.name}>
                    <input
                      className="productCreateDash-inputCheckbox"
                      type="checkbox"
                      name={el.name}
                      id={el.name}
                      checked={!!state[el.name]}
                      onChange={onInputChange}
                    />
                    <div className="productCreateDash-transition"></div>
                  </label>
                </div>
              );
            }

            return (
              <div className="productCreateDash-box" key={index}>
                <label className="productCreateDash-label" htmlFor={el.name}>{el.title}</label>
                <input
                  className="productCreateDash-input"
                  name={el.name}
                  id={el.name}
                  type={el.type}
                  value={state[el.name] || ""}
                  onChange={onInputChange}
                />
              </div>
            );
          })}

          {/* Render condicional del archivo adicional */}
          {!state.promocion ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="productCreateDash-label">Pdf del Producto</span>
              <div className="productCreateDash-boxFile">
                <iframe src={previewPdf} title="Vista previa PDF" className="productCreateDash-boxFilePdf" />
                <div className="productCreateDash-boxFileInput">
                  <label className="productCreateDash-labelInput" htmlFor="pdf">
                    <input
                      className="productCreateDash-inputFile"
                      type="file"
                      accept="application/pdf"
                      name="pdf"
                      id="pdf"
                      onChange={handleFileChange}
                    />
                    <span>Selecciona el PDF</span>
                  </label>
                  <span className="productCreateDash-file">{state.pdf?.name || "No hay ningún archivo."}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="productCreateDash-label">Imagen Promocional</span>
              <div className="productCreateDash-boxFile">
                {previewFotoPromo && (
                  <img className="productCreateDash-boxFileImg" src={previewFotoPromo} alt="Imagen promocional" />
                )}
                <div className="productCreateDash-boxFileInput">
                  <label className="productCreateDash-labelInput" htmlFor="fotoPromo">
                    <input
                      className="productCreateDash-inputFile"
                      type="file"
                      accept="image/*"
                      name="fotoPromo"
                      id="fotoPromo"
                      onChange={handleFileChange}
                    />
                    <span>Selecciona la imagen</span>
                  </label>
                  <span className="productCreateDash-file">{state.fotoPromo?.name || "No hay ningún archivo."}</span>
                </div>
              </div>
            </div>
          )}
        </fieldset>

        <h3 className="productCreateDash-formTitle">Datos Generales</h3>
        <fieldset className="productCreateDash-formContainer">
          {datosGenerales.map((el, index) => (
            <div className="productCreateDash-box" key={index}>
              <label className="productCreateDash-label" htmlFor={el.name}>{el.title}</label>
              <input
                className="productCreateDash-input"
                name={el.name}
                id={el.name}
                type={el.type}
                value={state[el.name] || ""}
                onChange={onInputChange}
              />
            </div>
          ))}
        </fieldset>

        <div className="productCreateDash-btns">
          <button className="productCreateDash-btn" type="submit">Crear</button>
          <button
            onClick={() => navigate("/dashboard/productos")}
            className="productCreateDash-btn productCreateDash-btnOtherColor"
            type="button"
          >
            Volver
          </button>
        </div>
      </form>
    </section>
  );
};
