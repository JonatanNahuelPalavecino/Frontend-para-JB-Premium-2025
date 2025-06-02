import { toast } from "sonner";

export const updateProduct = async (form, setLoading, navigate) => {
  const url = import.meta.env.VITE_SERVER;
  setLoading(true);
  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    const response = await fetch(`${url}/products/${form.productoId}`, {
        method: "PUT",
        credentials: "include",
        body: formData
    })

    if (!response.ok) {
      const data = await response.text()
      const res = JSON.parse(data)
      toast.warning(res.mensaje)
      return
    }

    const data = await response.json()

    if (data.estado === "error") {
        toast.error(data.mensaje)
        return
    }

    toast.success(data.mensaje)
    navigate("/dashboard/productos")
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
