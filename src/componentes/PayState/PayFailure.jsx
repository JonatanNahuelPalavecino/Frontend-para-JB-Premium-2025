import { Link } from "react-router-dom"
import { useEffect } from "react";

export const PayFailure = () => {

    useEffect(() => {
        
        document.title = "Pago Rechazado - JB Premium - Vinos Españoles - Distribuidor Oficial"

    }, [])

    return (
        <main className="pay">
                <img className='pay-img' alt="pago-rechazado" src='https://res.cloudinary.com/dcyhxj1nn/image/upload/v1754487351/veuuf3liof5csylzfrqt_dwa8kk.jpg'/>
                <div className="pay-container pay-failure">
                        <p className="pay-title">TU PAGO A SIDO RECHAZADO</p>
                        <div className="pay-box">
                            <p className="pay-desc">Tuvimos un problema en recibir tu pago. Pero no te preocupes!</p>
                            <p className="pay-desc">Podes volver a seleccionar tus productos e intentar con otro medio de pago.</p>
                            <p className="pay-desc">En breve te llegará un mail con el motivo del rechazo de tu pago. Recuerda revisar tu SPAM.</p>
                            <div className="pay-btns">
                            <Link className="pay-btn" to="/">VOLVER</Link>
                            <Link className="pay-btn pay-btnOtherColor" to="/mis-ordenes">Mis ordenes</Link>
                            </div>
                        </div>
                </div>
        </main>
    )
}
