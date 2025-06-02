export const getUsers = async (filters = {}) => {
    const url = import.meta.env.VITE_SERVER

    try {
        const response = await fetch(`${url}/user/getUsers`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({filters})
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.error(error)
        return []
    }
}