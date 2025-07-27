export const postOrder = async (order, userId, cart, metodoPago, setLoading) => {
    setLoading(true)
    const url = import.meta.env.VITE_SERVER

    const cartCasteado = cart.map((item) => {
        const precioElegido = metodoPago === "mercado_pago" ? item.precioEnPesos : item.precio

        return {
            ...item,
            precio: precioElegido
        }
    })

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            order: {
                userId,
                direccion: order.direccion,
                localidad: order.localidad,
                provincia: order.provincia,
                telefono: order.telefono,
                codigoPostal: order.codigoPostal,
            },
            carrito: cartCasteado,
            metodo_pago: {
                mercado_pago: metodoPago === "mercado_pago",
                pay_pal: metodoPago === "pay_pal"
            }
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