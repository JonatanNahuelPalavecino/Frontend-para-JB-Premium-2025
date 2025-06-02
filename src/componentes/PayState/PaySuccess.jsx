import { Link } from "react-router-dom"
import { useEffect } from "react";
import "./PayState.scss"

export const PaySuccess = () => {

    useEffect(() => {
        document.title = "Compra Finalizada - JB Premium - Vinos Españoles - Distribuidor Oficial"
    })

    return (
        <main className="pay">
                <img className='pay-img' alt="pago-realizado" src='https://res.cloudinary.com/dabgfr6qn/image/upload/v1744660436/flyer/eolmlkpz0rg8wa0bkjst.jpg'/>
                <div className="pay-container pay-success">
                    <p className="pay-title">COMPRA FINALIZADA</p>
                    <div className="pay-box">
                        <p className="pay-desc">En breve te llegará un mail con la confirmación, y en breve nos comunicaremos con vos para coordinar la entrega.</p>
                        <p className="pay-desc">Si no recibiste tu correo, recordá revisar tu casilla de SPAM.</p>
                        <p className="pay-desc">Muchas gracias por elegirnos!</p>
                        <div className="pay-btns">
                            <Link className="pay-btn" to="/">VOLVER</Link>
                            <Link className="pay-btn pay-btnOtherColor" to="/mis-ordenes">MIS ORDENES</Link>
                        </div>
                    </div>
                </div>
        </main>
    )
}
