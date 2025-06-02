export const putOrder = async (orderId, newOrder, newCart, setLoading) => {
    setLoading(true)
    const url = import.meta.env.VITE_SERVER

    const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
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
                nuevoCarrito: [
                    ...newCart
                ]
            }
        })
    }

    try {
        const response = await fetch(`${url}/order/${orderId}`, options)

        const data = await response.json()
        
        return data
    } catch (error) {
        console.log(error)
        return error
    } finally {
        setLoading(false)
    }
}