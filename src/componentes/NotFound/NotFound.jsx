import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.scss"

export const NotFound = () => {


    useEffect(() => {
        document.title = "Página no encontrada - JB Premium - Vinos Españoles - Distribuidor Oficial"
    }, [])

    return (
        <main className='notFound'>
                <img className='notFound-img' alt="notFound" src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1744660541/flyer/veuuf3liof5csylzfrqt.jpg"/>
                <div className='notFound-container'>
                    <strong className='notFound-title'>404 NOT FOUND - PAGINA NO ENCONTRADA</strong>
                    <em className='notFound-desc'>Estas en una ruta inexistente. Clickea el boton VOLVER para ir al Inicio</em>
                    <Link to="/" className="notFound-btn">
                        VOLVER
                    </Link>
                </div>
        </main>
    )
}
