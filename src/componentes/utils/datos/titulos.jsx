export const titulos = (title) => {
  switch (title) {
    case "nombre":
      return "Nombre";
    case "bodega":
      return "Bodega";
    case "precio":
      return "Precio (En USD)";
    case "activo":
      return "Producto Activo";
    case "accesorio":
      return "¿Es un accesorio?";
    case "porcDesc":
      return "Porcentaje de Descuento";
    case "destacado":
      return "Producto Destacado";
    case "stock_disponible":
      return "Stock Disponible";
    case "stock_total":
      return "Stock Total";
    case "cosecha":
      return "Año de Cosecha";
    case "region":
      return "Región de Origen";
    case "crianza":
      return "Crianza";
    case "descUno":
      return "1° Descripción";
    case "descDos":
      return "2° Descripción";
    case "faseGus":
      return "Fase Gustativa";
    case "faseVis":
      return "Fase Visual";
    case "faseOlf":
      return "Fase Olfativa";
    case "grado":
      return "Graduaje Alcohólico";
    case "maridaje":
      return "Maridaje";
    case "temp":
      return "Temperatura de Servicio";
    case "tipo":
      return "Tipo de Vino";
    case "ubicacion":
      return "URL D.O";
    case "vino":
      return "Vino";
    case "detalle":
      return "Detalle (Exclusivo accesorios y/o promos)";
    case "promocion":
      return "¿Producto en Promoción?";
  }
};
