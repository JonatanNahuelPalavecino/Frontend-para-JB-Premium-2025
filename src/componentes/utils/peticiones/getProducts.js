export const getProducts = async (filters={}, page = 1, limit = 10) => {
    const url = import.meta.env.VITE_SERVER

    try {
        const response = await fetch(`${url}/products/filters`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({filters, page, limit})
        })
        const data = await response.json()

        return {products: data.products, total: data.total}
    } catch (error) {
        console.error(error)
        return {products: [], total: 0}
    }
}