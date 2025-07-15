
import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './components/Scene'

function App() {
 return (
  <div className='h-screen min-h-screen bg-amber-100'>
    <Canvas >
       <Scene/>
    </Canvas>

  </div>
 )
}

export default App
