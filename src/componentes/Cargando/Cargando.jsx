import { useContext } from "react"
import "./Cargando.scss"
import { Context } from "../Context/Context"

export const Cargando = () => {

    const {loading} = useContext(Context)

    return (
        <div className={`cargando ${loading ? "cargando-show" : "cargando-hide"}`}>
            <h4 className="cargando-text">CARGANDO</h4>
            <img className="cargando-img" src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1742325732/uploads/logo.png" alt="logo"/>
            <div className="cargando-spinner"></div>
        </div>
    )
}