
import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './components/Model/Scene'
import Intro from './components/Sections/Intro'

function App() {
 return (
  <>
  {/* <div className='fixed h-screen min-h-screen bg-black w-full'>
    <Canvas >
       <Scene/>
    </Canvas>

  </div> */}
  <Intro/>
  </>
  
 )
}

export default App
