export const postOrder = async (order, userId, cart, setLoading) => {
    setLoading(true)
    const url = import.meta.env.VITE_SERVER

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            orden: {
                userId,
                direccion: order.direccion,
                localidad: order.localidad,
                provincia: order.provincia,
                telefono: order.telefono,
                codigoPostal: order.codigoPostal,
            },
            carrito: [
                ...cart
            ]
        })
    }

    try {
        const response = await fetch(`${url}/order`, options)

        const data = await response.json()
        
        return data
    } catch (error) {
        console.log(error)
        return error
    } finally {
        setLoading(false)
    }
}