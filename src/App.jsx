//COMPONENTE 
//1. Importamos la hoja de estilos App.css
import './App.css';
//2. Importaamos las dos grandes mitades de nuestra pantalla
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
 

function App() {
  return (
    // Contenedor principal que usa flexbox (definido en el App.css)
    //para poner las cosas lado a lado
    <div className='app-container'> 
    {/*Inyectamos la mitad izquierda a la pantalla*/}
    <Sidebar/>
    <ChatArea/>
    
      </div>
  )
} 

export default App;