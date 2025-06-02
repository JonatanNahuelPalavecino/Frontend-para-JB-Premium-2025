export const getAccesorios = async (options, setData, setError, url) => {
    try {
        const response = await fetch(`${url}/products/filters`, options)
        const data = await response.json()
        setData(data)
    } catch (error) {
        console.log("Error en getAccesorios - ", error)
        setError(error)
    }
}