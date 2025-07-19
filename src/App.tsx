
import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './components/Scene'

function App() {
 return (
  <div className='h-[300vh] w-full'>

  <div className='fixed h-screen min-h-screen bg-black w-full'>
    <Canvas >
       <Scene/>
    </Canvas>

  </div>
  </div>
 )
}

export default App
