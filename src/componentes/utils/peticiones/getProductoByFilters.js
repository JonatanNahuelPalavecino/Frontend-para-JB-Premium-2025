export const getProductoByFilters = async (options = {}, setData, setError, url, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = await fetch(`${url}/products/filters`, options)
        const data = await response.json()
        setData(data)
    } catch (error) {
        console.log("Error en getProductoByFilters - ", error)
        setError(error)
    } finally {
        setIsLoading(false)
    }
}