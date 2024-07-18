import { useState } from 'react'
import './Slider.css'

export const Slider = ( props ) => {
    const { imagenes } = props

    const [ slider , setSlider ] = useState( 0 )

    const sliderNext = () => {
        setSlider( slider + 1 )
        if ( slider >= imagenes.length - 1 ){
            setSlider( 0 )
        }
    }

    const sliderPrev = () => {
        setSlider( slider - 1 )
        if ( slider <= 0 ){
            setSlider( imagenes.length - 1)
        }
    }

    const sliderPoint = ( valor ) => {
        setSlider( valor )
    }

    return (
        <div className="Slider">
            {
                imagenes.map ( ( eachPropiedad , index ) =>
                <picture className={ `Slider-img ${ slider === index && 'isActive' }` }>
                    <source srcSet={ eachPropiedad.srcSet } type="image/webp" />
                    <img src={ eachPropiedad.src } alt={ eachPropiedad.alt } type="image/jpg" />
                </picture>)
            }

            <button className="Slider-arrow next" onPointerDown={ sliderNext }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="Slider-chevron" viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            <button className="Slider-arrow prev" onPointerDown={ sliderPrev }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="Slider-chevron" viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>

            <ul className="Slider-ul">
                { imagenes.map( ( eachPropiedad , index ) =>
                    <li key={ eachPropiedad.id } className="Slider-li">
                        <button onPointerDown={ () => sliderPoint( index ) } className={ `Slider-point ${ slider === index && 'isActive' }` }></button>
                    </li>
                ) }
            </ul>
        </div>
    )
}