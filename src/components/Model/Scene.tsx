import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Model";

const Scene = () => {
  return (
    <>
      <OrbitControls  enableZoom={false}/>
      <PerspectiveCamera
        makeDefault
        near={0.1}
        far={10000}
        position={[0, 0, 5]}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
      
      />
    
      <Model/>
    </>
  );
};

export default Scene;
