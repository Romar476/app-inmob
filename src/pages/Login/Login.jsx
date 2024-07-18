import { useState , useRef , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {

    const navigate = useNavigate()

    const [ login , setLogin ] = useState(null)

    const { VITE_API } = import.meta.env

    useEffect( () => {

        if( login ) {
            navigate( '/gestordepropiedades' ) // Si login es correcto, navega a la página Gestor que está en la url /gestordepropiedades
        }
        
    } , [ login ] ) // Este useEffect se ejecuta cuando el state login cambie    

    const formulario = useRef()

    const postLogin = async ( e ) => {
        e.preventDefault()

        const { current : form } = formulario

        const nuevo = {
            user : form['user'].value,
            pass : form['pass'].value
        }

        let controller = new AbortController()

        let options = {
            method : 'post',
            signal : controller.signal,
            body : JSON.stringify( nuevo ),
            headers : { "Content-type" : "application/json" }
        }

        await fetch( `${ VITE_API }/paneldeadministracion` , options )
        .then( res => res.json() )
        .then( data => {
            if( data.login ){
                localStorage.setItem( 'user' , JSON.stringify( { login:true } ) )
            }
        } )
    }

    return (
        <div className="Login">
            <form className="Login-form" ref={ formulario } onSubmit={ postLogin }>
                <fieldset className="Login-fieldset">
                    <label className="Login-label">Usuario</label>
                    <input className="Login-input" type="text" name="user" placeholder="Usuario" required />
                </fieldset>
                <fieldset className="Login-fieldset">
                    <label className="Login-label">Contraseña</label>
                    <input className="Login-input" type="password" name="pass" placeholder="Contraseña" required />
                </fieldset>
                <button className="Login-btn">Inichiar sesión</button>
            </form>

            { login != null && <MensajeError /> }
        </div>
    )
}

const MensajeError = () => {
    return (
        <div className="Login-message">
            Datos de acceso incorrectos
        </div>
    )
}