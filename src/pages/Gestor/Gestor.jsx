import { useState , useEffect , useRef, useContext } from 'react'
import { PropiedadesContext } from '../../context/Context'
import './Gestor.css'

const { VITE_API } = import.meta.env

export const Gestor = () => {

    // STATE
    const [ propiedades , setPropiedades ] = useState( [] )

    // REF
    const formularioAdd = useRef()
    const formularioPut = useRef()

    // EFECTOS
    useEffect( () => {
        pedirPropiedades()
    } , [] )

    // FUNCIONES
    // Con esta función, pedimos la información a la API sobre todas las propiedades existentes en la bbdd
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

    // Con esta otra función se crea un formulario para añadir propiedades nuevas a la bbdd. Los valres que haya en cada uno de los inputs, serán los que se guardarán en la bbdd, mientras que lo inputs que no se completen, simplemente no se rellenarán en la bbdd y no se mostrarán en el frontend
    const postPropiedades = async ( e ) => {
        e.preventDefault()

        const { current : form } = formularioAdd

        const nueva = {
            referencia : form[ 'referencia' ].value,
            cintillo : form[ 'cintillo' ].value,
            titulo_corto : form[ 'titulocorto' ].value,
            titulo_largo : form[ 'titulolargo' ].value,
            subtitulo : form[ 'subtitulo' ].value,
            zona : form[ 'zona' ].value,
            descripcion_corta : form[ 'descripcioncorta' ].value,
            descripcion_larga : form[ 'descripcionlarga' ].value,
            descripcion_larga1 : form[ 'descripcionlarga1' ].value,
            descripcion_larga2 : form[ 'descripcionlarga2' ].value,
            descripcion_larga3 : form[ 'descripcionlarga3' ].value,
            descripcion_larga4 : form[ 'descripcionlarga4' ].value,
            descripcion_larga5 : form[ 'descripcionlarga5' ].value,
            descripcion_larga6 : form[ 'descripcionlarga6' ].value,
            descripcion_larga7 : form[ 'descripcionlarga7' ].value,
            descripcion_larga8 : form[ 'descripcionlarga8' ].value,
            precio : form[ 'precio' ].value,
            habitaciones : form[ 'habitaciones' ].value,
            banos : form[ 'banos' ].value,
            construido : form[ 'construido' ].value,
            terraza : form[ 'terraza' ].value,
            parcela : form[ 'parcela' ].value,
            jardin : form[ 'jardin' ].value,
            piscina : form[ 'piscina' ].value,
            garaje : form[ 'garaje' ].value,
        }

        form['referencia'].value = '' // Todas estas líneas son para que una vez añadida la nueva propiedad, todos los inputs vuelvan a su estado original vacío, mostrando su correspondiente placeholder
        form['cintillo'].value = ''
        form['titulocorto'].value = ''
        form['titulolargo'].value = ''
        form['subtitulo'].value = ''
        form['zona'].value = ''
        form['descripcioncorta'].value = ''
        form['descripcionlarga'].value = ''
        form['descripcionlarga1'].value = ''
        form['descripcionlarga2'].value = ''
        form['descripcionlarga3'].value = ''
        form['descripcionlarga4'].value = ''
        form['descripcionlarga5'].value = ''
        form['descripcionlarga6'].value = ''
        form['descripcionlarga7'].value = ''
        form['descripcionlarga8'].value = ''
        form['precio'].value = ''
        form['habitaciones'].value = ''
        form['banos'].value = ''
        form['construido'].value = ''
        form['terraza'].value = ''
        form['parcela'].value = ''
        form['jardin'].value = ''
        form['piscina'].value = ''
        form['garaje'].value = ''

        let controller = new AbortController()

        let options = {
            method : 'post',
            signal : controller.signal,
            body : JSON.stringify( nueva ),
            headers : { "Content-type" : "application/json" }
        }

        await fetch( `${ VITE_API }/gestordepropiedades` , options )
        .then( res => res.json() )
        .then( data => setPropiedades( data ) )
        .catch( err => console.log( err.message ) )
        .finally( () => controller.abort() )
    }

    // Con esta pequeña función, simplemente borramos una entrada completa de la bbdd
    const deletePropiedades = async ( _id ) => {

        let controller = new AbortController()

        let options = {
            method : 'delete',
            signal : controller.signal
        }

        await fetch( `${ VITE_API }/gestordepropiedades/id/${ _id }` , options )
        .then( res => res.json() )
        .then( data => setPropiedades( data ) )
        .cathc( err => console.log( err.message ) )
        .finally( () => controller.abort() )
    }

    // Esta es la función por la cual, al hacer click sobre el botón Actualizar que hay en cada una de las propiedades, nos busca primero la correspondiente propiedad y luego copia los valores de cada uno de los campos en el formulario Actualizar propiedad
    const putPropiedadesBoton = async ( _id ) => {
        const buscar = propiedades.find( eachPropiedad => eachPropiedad._id === _id)
        const { current : form } = formularioPut
        form[ 'id' ].value = buscar._id
        form[ 'referencia' ].value = buscar.referencia
        form[ 'cintillo' ].value = buscar.cintillo
        form[ 'titulocorto' ].value = buscar.titulo_corto
        form[ 'titulolargo' ].value = buscar.titulo_largo
        form[ 'subtitulo' ].value = buscar.subtitulo
        form[ 'zona' ].value = buscar.zona
        form[ 'descripcioncorta' ].value = buscar.descripcion_corta
        form[ 'descripcionlarga' ].value = buscar.descripcion_larga
        form[ 'descripcionlarga1' ].value = buscar.descripcion_larga1
        form[ 'descripcionlarga2' ].value = buscar.descripcion_larga2
        form[ 'descripcionlarga3' ].value = buscar.descripcion_larga3
        form[ 'descripcionlarga4' ].value = buscar.descripcion_larga4
        form[ 'descripcionlarga5' ].value = buscar.descripcion_larga5
        form[ 'descripcionlarga6' ].value = buscar.descripcion_larga6
        form[ 'descripcionlarga7' ].value = buscar.descripcion_larga7
        form[ 'descripcionlarga8' ].value = buscar.descripcion_larga8
        form[ 'precio' ].value = buscar.precio
        form[ 'habitaciones' ].value = buscar.habitaciones
        form[ 'banos' ].value = buscar.banos
        form[ 'construido' ].value = buscar.construido
        form[ 'terraza' ].value = buscar.terraza
        form[ 'parcela' ].value = buscar.parcela
        form[ 'piscina' ].value = buscar.piscina
        form[ 'jardin' ].value = buscar.jardin
        form[ 'garaje' ].value = buscar.garaje
    }

    // Esta es parecida a la anterior, solo que en esta ocasión, una vez actualizado el formulario, al hacer click sobre el botón Actualizar propiedad, se muestran los nuevos valores en la parte superior en la que se encuentran todas las propiedades
    const putPropiedades = async ( e ) => {
        e.preventDefault()

        const { current : form } = formularioPut

        const actualizar = {
            _id : form['id'].value,
            referencia : form[ 'referencia' ].value,
            cintillo : form[ 'cintillo' ].value,
            titulo_corto : form[ 'titulocorto' ].value,
            titulo_largo : form[ 'titulolargo' ].value,
            subtitulo : form[ 'subtitulo' ].value,
            zona : form[ 'zona' ].value,
            descripcion_corta : form[ 'descripcioncorta' ].value,
            descripcion_larga : form[ 'descripcionlarga' ].value,
            descripcion_larga1 : form[ 'descripcionlarga1' ].value,
            descripcion_larga2 : form[ 'descripcionlarga2' ].value,
            descripcion_larga3 : form[ 'descripcionlarga3' ].value,
            descripcion_larga4 : form[ 'descripcionlarga4' ].value,
            descripcion_larga5 : form[ 'descripcionlarga5' ].value,
            descripcion_larga6 : form[ 'descripcionlarga6' ].value,
            descripcion_larga7 : form[ 'descripcionlarga7' ].value,
            descripcion_larga8 : form[ 'descripcionlarga8' ].value,
            precio : form[ 'precio' ].value,
            habitaciones : form[ 'habitaciones' ].value,
            banos : form[ 'banos' ].value,
            construido : form[ 'construido' ].value,
            terraza : form[ 'terraza' ].value,
            parcela : form[ 'parcela' ].value,
            jardin : form[ 'jardin' ].value,
            piscina : form[ 'piscina' ].value,
            garaje : form[ 'garaje' ].value,
        }

        form['referencia'].value = ''
        form['cintillo'].value = ''
        form['titulocorto'].value = ''
        form['titulolargo'].value = ''
        form['subtitulo'].value = ''
        form['zona'].value = ''
        form['descripcioncorta'].value = ''
        form['descripcionlarga'].value = ''
        form['descripcionlarga1'].value = ''
        form['descripcionlarga2'].value = ''
        form['descripcionlarga3'].value = ''
        form['descripcionlarga4'].value = ''
        form['descripcionlarga5'].value = ''
        form['descripcionlarga6'].value = ''
        form['descripcionlarga7'].value = ''
        form['descripcionlarga8'].value = ''
        form['precio'].value = ''
        form['habitaciones'].value = ''
        form['banos'].value = ''
        form['construido'].value = ''
        form['terraza'].value = ''
        form['parcela'].value = ''
        form['jardin'].value = ''
        form['piscina'].value = ''
        form['garaje'].value = ''

        let controller = new AbortController()

        let options = {
            method : "put",
            signal : controller.signal,
            body : JSON.stringify( actualizar ),
            headers : {
                "Content-type" : "application/json"
            }
        }

        await fetch( `${ VITE_API }/gestordepropiedades` , options )
        .then( res => res.json() )
        .then( data => setPropiedades( data ) )
        .catch( err => console.log( err.message ) )
        .finally( () => controller.abort() )
    }

    return (
        <PropiedadesContext.Provider value={ { deletePropiedades , putPropiedadesBoton } }>
            <div className="Gestor">
                <section className="Gestor Propiedades">
                    { propiedades.length === 0 && <p>No hay propiedades</p> }
                    { propiedades.length !== 0 && propiedades.map( eachPropiedad =>
                        <PropiedadLista key={ eachPropiedad._id } { ...eachPropiedad } />
                    ) }
                </section>

                <section className="Gestor Propiedades">
                    <h2 className="Propiedades-apartado">Añadir una nueva Propiedad</h2>
                    <form ref={ formularioAdd } onSubmit={ postPropiedades }>
                        <input type="text" className="Propiedades-input" name="referencia" placeholder="Referencia" />
                        <input type="text" className="Propiedades-input" name="cintillo" placeholder="Cintillo" />
                        <input type="text" className="Propiedades-input" maxlength="40" name="titulocorto" placeholder="Título corto" />
                        <input type="text" className="Propiedades-input" maxlength="100" name="titulolargo" placeholder="Título largo" />
                        <input type="text" className="Propiedades-input" maxlength="50" name="subtitulo" placeholder="Subtítulo" />
                        <input type="text" className="Propiedades-input" name="descripcioncorta" maxLength="200" placeholder="Descripción corta" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga" placeholder="Descripción larga" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga1" placeholder="Descripción larga 1" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga2" placeholder="Descripción larga 2" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga3" placeholder="Descripción larga 3" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga4" placeholder="Descripción larga 4" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga5" placeholder="Descripción larga 5" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga6" placeholder="Descripción larga 6" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga7" placeholder="Descripción larga 7" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga8" placeholder="Descripción larga 8" />
                        <input type="text" className="Propiedades-input" maxlength="40" name="zona" placeholder="Zona" />
                        <input type="text" className="Propiedades-input" name="precio" placeholder="Precio" />
                        <input type="text" className="Propiedades-input" name="habitaciones" placeholder="Habitaciones" />
                        <input type="text" className="Propiedades-input" name="banos" placeholder="Baños" />
                        <input type="text" className="Propiedades-input" name="construido" placeholder="Superficie construída" />
                        <input type="text" className="Propiedades-input" name="terraza" placeholder="Terraza" />
                        <input type="text" className="Propiedades-input" name="parcela" placeholder="Parcela" />
                        <input type="text" className="Propiedades-input" name="piscina" placeholder="Piscina" />
                        <input type="text" className="Propiedades-input" name="jardin" placeholder="Jardín" />
                        <input type="text" className="Propiedades-input" name="garaje" placeholder="Garaje" />
                        <input type="submit" className="Propiedades-btn2" value="Añadir Propiedad nueva" />
                    </form>
                </section>

                <section className="Gestor Propiedades">
                    <h2 className="Propiedades-apartado">Actualizar Propiedad</h2>
                    <form ref={ formularioPut } onSubmit={ putPropiedades }>
                        <input type="hidden" name="id" placeholder="ID" />
                        <input type="text" className="Propiedades-input" name="referencia" maxLength="16" placeholder="Referencia" />
                        <input type="text" className="Propiedades-input" name="cintillo" placeholder="Cintillo" />
                        <input type="text" className="Propiedades-input" maxlength="40" name="titulocorto" placeholder="Título corto" />
                        <input type="text" className="Propiedades-input" maxlength="100" name="titulolargo" placeholder="Título largo" />
                        <input type="text" className="Propiedades-input" maxlength="50" name="subtitulo" placeholder="Subtítulo" />
                        <input type="text" className="Propiedades-input" maxlength="40" name="zona" placeholder="Zona" />
                        <input type="text" className="Propiedades-input" name="descripcioncorta" maxLength="200" placeholder="Descripción corta" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga" placeholder="Descripción larga" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga1" placeholder="Descripción larga 1" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga2" placeholder="Descripción larga 2" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga3" placeholder="Descripción larga 3" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga4" placeholder="Descripción larga 4" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga5" placeholder="Descripción larga 5" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga6" placeholder="Descripción larga 6" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga7" placeholder="Descripción larga 7" />
                        <textarea className="Propiedades-input" rows="5" name="descripcionlarga8" placeholder="Descripción larga 8" />
                        <input type="text" className="Propiedades-input" name="precio" placeholder="Precio" />
                        <input type="text" className="Propiedades-input" name="habitaciones" placeholder="Habitaciones" />
                        <input type="text" className="Propiedades-input" name="banos" placeholder="Baños" />
                        <input type="text" className="Propiedades-input" name="construido" placeholder="Superficie construída" />
                        <input type="text" className="Propiedades-input" name="terraza" placeholder="Terraza" />
                        <input type="text" className="Propiedades-input" name="parcela" placeholder="Parcela" />
                        <input type="text" className="Propiedades-input" name="piscina" placeholder="Piscina" />
                        <input type="text" className="Propiedades-input" name="jardin" placeholder="Jardín" />
                        <input type="text" className="Propiedades-input" name="garaje" placeholder="Garaje" />
                        <input type="submit" className="Propiedades-btn2" value="Actualizar Propiedad" />
                    </form>
                </section>
            </div>
        </PropiedadesContext.Provider>
    )
}

// Componente PropiedadLista
const PropiedadLista = ( props ) => {

    const { _id , referencia , cintillo , titulo_corto , titulo_largo , subtitulo , zona , descripcion_corta , descripcion_larga , descripcion_larga1 , descripcion_larga2 , descripcion_larga3 , descripcion_larga4 , descripcion_larga5 , descripcion_larga6 , descripcion_larga7 , descripcion_larga8 , precio , habitaciones , banos , construido , terraza , parcela , jardin , piscina , garaje , imagenes } = props
    const { deletePropiedades , putPropiedadesBoton } = useContext( PropiedadesContext )

    return (
        <div className="Propiedades-individual">
            <p className="Propiedades-cintillo">{ cintillo }</p>
            <p className="Propiedades-epigrafe">REFERENCIA</p>
            <p className="Propiedades-ref">{ referencia }</p>
            <p className="Propiedades-epigrafe">ZONA</p>
            <p className="Propiedades-zona">{ zona }</p>
            <p className="Propiedades-epigrafe">TÍTULOS</p>
            <p className="Propiedades-descripcion">TÍTULO CORTO</p>
            <h2 className="Propiedades-h2">{ titulo_corto }</h2>
            <p className="Propiedades-descripcion">TÍTULO LARGO</p>
            <h2 className="Propiedades-h2">{ titulo_largo }</h2>
            <p className="Propiedades-epigrafe">SUBTÍTULO</p>
            <h3 className="Propiedades-h3">{ subtitulo }</h3>
            <p className="Propiedades-epigrafe">DESCRIPCIÓN</p>
            <p className="Propiedades-descripcion">DESCRIPCIÓN CORTA</p>
            <p className="Propiedades-p">{ descripcion_corta }</p>
            <p className="Propiedades-descripcion">DESCRIPCIÓN LARGA</p>
            <p className="Propiedades-p">{ descripcion_larga }</p>
            <p className="Propiedades-p">{ descripcion_larga1 }</p>
            <p className="Propiedades-p">{ descripcion_larga2 }</p>
            <p className="Propiedades-p">{ descripcion_larga3 }</p>
            <p className="Propiedades-p">{ descripcion_larga4 }</p>
            <p className="Propiedades-p">{ descripcion_larga5 }</p>
            <p className="Propiedades-p">{ descripcion_larga6 }</p>
            <p className="Propiedades-p">{ descripcion_larga7 }</p>
            <p className="Propiedades-p">{ descripcion_larga8 }</p>
            <p className="Propiedades-precio">{ precio }</p>
            <div className="Propiedades-ul">
                <p className="Propiedades-p">{ habitaciones }</p>
                <p className="Propiedades-p">{ banos }</p>
                <p className="Propiedades-p">{ construido }</p>
                <p className="Propiedades-p">{ terraza }</p>
                <p className="Propiedades-p">{ parcela }</p>
                <p className="Propiedades-p">{ piscina }</p>
                <p className="Propiedades-p">{ jardin }</p>
                <p className="Propiedades-p">{ garaje }</p>
            </div>
            <button className="Propiedades-btn" onClick={ () => putPropiedadesBoton( _id ) }>Actualizar</button>
            <button className="Propiedades-btn" onClick={ () => deletePropiedades( _id ) }>Eliminar</button>
        </div>
    )
}