export const putUser = async (userId, setLoading, form) => {

    setLoading(true);
    const url = import.meta.env.VITE_SERVER;

    const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({filters: form})
    }

    try {
        const response = await fetch(`${url}/user/editUser/${userId}`, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log("", error)
    } finally {
        setLoading(false)
    }
}