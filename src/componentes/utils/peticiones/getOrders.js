export const getOrdersById = async (filters ={}) => {
    const url = import.meta.env.VITE_SERVER

    try {
        const response = await fetch(`${url}/order/filters`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({filters})
        })

        const data = await response.json()

        return data.orders
    } catch (error) {
        console.error(error)
        return []
    }
}