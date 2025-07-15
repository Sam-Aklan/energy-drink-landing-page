import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
    SoftShadows,
  } from "@react-three/drei";
  import { useRef } from "react";
  import * as THREE from "three";
import { Model } from "./Model";
  const Scene = () => {
   
  
    return (
      <>
        <OrbitControls />
        <PerspectiveCamera
          makeDefault
          near={0.1}
          far={10000}
          position={[0, 0, 5]}
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
        />
        {/* ===== LIGHTING IMPROVEMENTS ===== */}
             {/* <ambientLight intensity={10} color="#ffffff" />
              
              <directionalLight
                position={[5, 10, 7]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.001}
                color="#ffeecc"
              />
              
              <directionalLight
                position={[-5, 5, -5]}
                intensity={0.8}
                color="#ccddff"
              />
              
              <pointLight
                position={[0, 5, 0]}
                intensity={0.5}
                distance={10}
                decay={2}
                color="#ffffff"
              />
              <hemisphereLight 
  intensity={0.6}
  groundColor="#804000"
/> */}
              {/* <SoftShadows size={25} focus={1} samples={10} /> */}
        {/* <Environment preset="studio" /> */}
        <Model/>
      </>
    );
  };
  
  export default Scene;