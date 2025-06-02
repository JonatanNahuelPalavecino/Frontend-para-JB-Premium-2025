import { toast } from "sonner"

export const deleteProduct = async (productoId, setLoading) => {
    setLoading(true)
    const url = import.meta.env.VITE_SERVER

    const options = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    }

    try {
        const response = await fetch(`${url}/products/${productoId}`, options)
        const data = await response.json()
        
        if (data.estado === "error") {
            return toast.error(data.mensaje)
        }

        toast.success(data.mensaje)
    } catch (error) {
        console.log(error)
        toast.error("Hubo un error con el servidor. Intente mas tarde")
    } finally {
        setLoading(false)
    }
}