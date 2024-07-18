import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Gestor } from './pages/Gestor/Gestor'
import { Propiedades } from './components/propiedades/Propiedades'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/paneldeadministracion' element={ <Login /> } />
          <Route path='/gestordepropiedades' element={ <Gestor /> } />
          <Route path='/propiedades' element={ <Propiedades /> } />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
