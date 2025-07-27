import { useNavigate, useParams } from "react-router-dom";
import "./ProductEditDash.scss";
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";
import { updateProduct } from "../utils/peticiones/updateProduct";
import { Context } from "../Context/Context";
import { toast } from "sonner";
import { titulos } from "../utils/datos/titulos";

export const ProductEditDash = () => {
  const { productoId } = useParams();
  const { setLoading } = useContext(Context);
  const { data, error, loading, fetchData } = useFetch();
  const [form, setForm] = useState({});
  const [previewFoto, setPreviewFoto] = useState("");
  const [previewFotoPromo, setPreviewFotoPromo] = useState("");
  const [previewPdf, setPreviewPdf] = useState("");
  const url = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const pdfInputRef = useRef();
  const inputFotoText = useRef();
  const inputFotoPromoText = useRef();
  const inputPdfText = useRef();

  useEffect(() => {
    document.title = "Edición del Producto - JB Premium - Vinos Españoles - Distribuidor Oficial";
    fetchData(`${url}/products/${productoId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productoId]);

  useEffect(() => {
    if (data?.product) {
      setForm(data.product);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(form, setLoading, navigate);
  };

  const onInputChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      const isImage = file.type === "image/png";
      const isPdf = file.type === "application/pdf";

      if (name === "foto" || name === "fotoPromo") {
        if (!isImage) {
          toast.warning("Solo se permiten archivos PNG para imágenes.");
          return;
        }

        setForm((prev) => ({ ...prev, [name]: file }));

        const url = URL.createObjectURL(file);
        if (name === "foto") {
          inputFotoText.current.innerText = file.name;
          setPreviewFoto(url);
        } else {
          inputFotoPromoText.current.innerText = file.name;
          setPreviewFotoPromo(url);
        }
      } else if (name === "pdf") {
        if (!isPdf) {
          toast.warning("Solo se permiten archivos PDF para documentos.");
          return;
        }

        setForm((prev) => ({ ...prev, [name]: file }));
        inputPdfText.current.innerText = file.name;
        setPreviewPdf(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemovePdf = () => {
    setPreviewPdf("");
    setForm((prev) => ({ ...prev, pdf: "", deletePdf: 1 }));
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    if (inputPdfText.current)
      inputPdfText.current.innerText = "No hay ningún archivo.";
  };

  const renderFileInput = (key, preview, inputRefText, fileRef = null) => (
    <div className="productEditDash-boxFile" key={key}>
      {preview &&
        (key === "pdf" ? (
          <iframe
            src={preview}
            title="Vista previa PDF"
            className="productEditDash-boxFilePdf"
          />
        ) : (
          <img
            className="productEditDash-boxFileImg"
            src={preview}
            alt={`Vista previa ${key}`}
          />
        ))}
      <div className="productEditDash-boxFileInput">
        <label className="productEditDash-labelInput" htmlFor={key}>
          <input
            className="productEditDash-inputFile"
            type="file"
            accept={key === "pdf" ? "application/pdf" : "image/png"}
            name={key}
            id={key}
            ref={fileRef}
            onChange={onInputChange}
          />
          <span>Selecciona el archivo</span>
        </label>
        <span className="productEditDash-file" ref={inputRefText}>
          {form[key]?.name || "No hay ningún archivo."}
        </span>
        {key === "pdf" && form[key] && (
          <button
            type="button"
            className="productEditDash-btn productEditDash-btnDelete"
            onClick={handleRemovePdf}
          >
            Eliminar PDF
          </button>
        )}
      </div>
    </div>
  );

  const renderInput = (key) => {
    if (key === "foto") {
      return renderFileInput("foto", previewFoto || form.foto, inputFotoText);
    }

    if (key === "fotoPromo") {
      return renderFileInput("fotoPromo", previewFotoPromo || form.fotoPromo, inputFotoPromoText);
    }

    if (key === "pdf") {
      return renderFileInput("pdf", previewPdf || form.pdf, inputPdfText, pdfInputRef);
    }

    if (["activo", "accesorio", "destacado", "promocion"].includes(key)) {
      return (
        <div className="productEditDash-box" key={key}>
          <span className="productEditDash-label">{titulos(key)}</span>
          <label className="productEditDash-labelCheckbox" htmlFor={key}>
            <input
              className="productEditDash-inputCheckbox"
              type="checkbox"
              name={key}
              id={key}
              checked={!!form[key]}
              onChange={onInputChange}
            />
            <div className="productEditDash-transition"></div>
          </label>
        </div>
      );
    }

    if (key !== "deletePdf") {
      return (
        <div className="productEditDash-box" key={key}>
          <label className="productEditDash-label" htmlFor={key}>
            {titulos(key)}
          </label>
          <input
            className="productEditDash-input"
            type="text"
            name={key}
            id={key}
            value={form[key] || ""}
            onChange={onInputChange}
          />
        </div>
      );
    }

    return null;
  };

  const renderSection = (title, keys) => (
    <>
      <h3 className="productEditDash-formTitle">{title}</h3>
      <div className="productEditDash-formContainer">
        {keys.map((key) => Object.hasOwn(form, key) && renderInput(key))}
      </div>
    </>
  );

  const datosPrincipalesKeys = [
    "nombre",
    "bodega",
    "precio",
    "activo",
    "accesorio",
    "promocion",
    "porcDesc",
    "destacado",
    "stock_disponible",
    "stock_total",
    "foto",
    ...(form.promocion ? ["fotoPromo"] : ["pdf"]),
  ];

  return (
    <section className="productEditDash">
      <h2 className="productEditDash-title">Editar producto</h2>
      {loading ? (
        <div className="productEditDash-loading">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonComponent key={i} width="100%" height="350px" />
          ))}
        </div>
      ) : error ? (
        <p>Hubo un error al permitir modificar el producto.</p>
      ) : (
        <form className="productEditDash-form" onSubmit={handleSubmit}>
          {renderSection("Datos principales", datosPrincipalesKeys)}
          {renderSection("Datos Generales", [
            "cosecha",
            "region",
            "crianza",
            "descUno",
            "descDos",
            "faseGus",
            "faseVis",
            "faseOlf",
            "grado",
            "maridaje",
            "temp",
            "tipo",
            "ubicacion",
            "vino",
            "detalle",
          ])}
          <div className="productEditDash-btnContainer">
            <button className="productEditDash-btn" type="submit">
              MODIFICAR
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/productos")}
              className="productEditDash-btn productEditDash-btnOtherColor"
            >
              VOLVER
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
