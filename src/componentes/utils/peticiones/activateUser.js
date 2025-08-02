export const activateUser = async (email, setLoading) => {
    setLoading(true)
    const url = import.meta.env.VITE_SERVER
    try {
        const response = await fetch(`${url}/user/activate-user`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email})
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
        return error
    } finally {
        setLoading(false)
    }
}