import { useEffect, useState } from 'react'
import './Propiedades.css'
import { Pictures } from '../pictures/Pictures'

const { VITE_API } = import.meta.env

export const Propiedades = () => {

    const [ propiedades , setPropiedades ] = useState( [] )

    useEffect( () => {
        pedirPropiedades()
    } , [] )

    const pedirPropiedades = async () => {
        let controller = new AbortController()
        let options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch( `${ VITE_API }/gestordepropiedades` , options )
        .then( res => res.json() )
        .then( data => setPropiedades( data ) )
        .catch( err => console.log( err.message ) )
        .finally( () => controller.abort() )
    }

    return (
        <>
            <div className="Intro-wrapper">
                <h1 className="Intro-h1">Propiedades</h1>
                <p className="Intro-p">En <span className="bold">Tu inmobiliaria en Málaga</span>, te presentamos una colección exclusiva de propiedades que destacan por su calidad. Cada una de ellas, ha sido seleccionada minuciosamente para garantizar que cumple con los más altos estándares. Por eso, trabajamos incansablemente buscando la excelencia en cada propiedad que representamos, evaluando aspectos como la ubicación, la construcción y el potencial de inversión.</p>
                <p className="Intro-p">Comprendemos que la búsqueda de la propiedad perfecta puede ser desafiante, y estamos aquí para facilitar ese proceso. Trabajamos contigo para entender tus necesidades y objetivos, ya sea una casa familiar, un proyecto de inversión o un espacio para tu negocio.</p>
                <p className="Intro-p">En <span className="bold">Tu inmobiliaria en Málaga</span>, te ofrecemos la garantía de un hogar donde puedas crear recuerdos y alcanzar tus metas. Explora nuestras propiedades y déjanos guiarte hacia una experiencia inmobiliaria excepcional.</p>
            </div>
            <section className="Breve-section">
                { propiedades.length === 0 && <p>No hay propiedades</p> }
                { propiedades.length !== 0 && propiedades.map( eachPropiedad =>
                    <PropiedadLista key={ eachPropiedad._id } { ...eachPropiedad }/>
                ) }
            </section>
        </>
    )
}

const PropiedadLista = ( props ) => {

    // Aunque finalmente no las he podido utilizar, he dejado preparadas las props para poder utilizar las imágenes de la bbdd
    const { _id , referencia , cintillo , titulo_corto , zona , descripcion_corta , precio , habitaciones , construido , banos , terraza , parcela , jardin , piscina , garaje , imagenes } = props
    const { src , srcset , alt } = imagenes ?? {};

    return (
        <>
            <div className="Breve-wrapper">
                <div className="Breve-img">
                    <picture> // Mediante estas cuatro líneas, damos la posibilidad de que el navegador elija la foto en formato .jpg o .webp
                        <source srcSet={ ( `assets/001_ref_tim01_9_1.webp`) } alt={alt} type="image/webp"/>
                        <img src={ ( `assets/001_ref_tim01_9_1.jpg`) } alt={alt} type="image/jpg"/>
                    </picture>
                </div>
                <div className="Breve-info">
                    <p className="Breve-cintillo">{ cintillo }</p>
                    <p className="Breve-ref">{ referencia }</p>
                    <p className="Breve-zona">{ zona }</p>
                    <h2 className="Breve-h2">{ titulo_corto }</h2>
                    <p className="Breve-p">{ descripcion_corta }</p>
                    <p className="Breve-precio">{ precio }</p>
                    <div className="Breve-otras">
                        <ul className="Breve-ul">
                            <li className="Breve-li">{ habitaciones }</li>
                            <li className="Breve-li">Habs.</li>
                        </ul>
                        <ul className="Breve-ul">
                            <li className="Breve-li">{ banos }</li>
                            <li className="Breve-li">Baños</li>
                        </ul>
                        <ul className="Breve-ul">
                            <li className="Breve-li">{ construido }</li>
                            <li className="Breve-li">Construído</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}