
import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { ShaderMaterial } from '../../shaders/ShaderMaterial_1'
import { useFrame, useThree } from '@react-three/fiber'
type GLTFResult = GLTF & {
  nodes: {
    Body_Material001_0: THREE.Mesh
    Pull_Material001_0: THREE.Mesh
    Spout_Material001_0: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const outerRef = React.useRef<THREE.Group>(null)
  const innerRef = React.useRef<THREE.Group>(null)



  const gltf = useGLTF('/model/juice-can.glb') as unknown as GLTFResult
  const {nodes,materials,} = gltf
  
  
  React.useEffect(()=>{
    materials['Material.001'].envMapIntensity = 1
    materials['Material.001'].metalness = 0.05
    materials['Material.001'].roughness = 0.5
   
    return ()=>{
        gltf.scene.traverse(child=>{
            if ((child as THREE.Mesh).geometry) {
                (child as THREE.Mesh).geometry.dispose()
            }
            if ((child as THREE.Mesh).material) {
                const material =  (child as THREE.Mesh).material
                if(Array.isArray(material)) material.forEach(m=>m.dispose)
                else material.dispose()
            }
        })
      
    }
  },[gltf])
  useFrame(({clock}) => {
    if (outerRef.current && innerRef.current) {
        // outerRef.current.position.y = Math.sin(clock.getElapsedTime()*2) *.1
        innerRef.current.rotation.y = Math.PI /.875 + Math.sin(clock.getElapsedTime()) * .75
    }
  });
  return (
    <group {...props} scale={.275} ref={outerRef} rotation={[0,Math.PI /2.5, 0]} >

<ambientLight intensity={1} color="#ffffff" />
      
      {/* Main key light */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        color="#ffeeee"
        castShadow
        shadow-mapSize={4096}
        shadow-normalBias={0.05}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-10, 10, -10]}
        intensity={1.5}
        color="#eeeeff"
      />
      
      {/* Ground bounce light */}
      <directionalLight
        position={[0, -10, 0]}
        intensity={1}
        color="#ddddff"
      />
      
      {/* Overhead fill light */}
      <pointLight
        position={[0, 15, 0]}
        intensity={1}
        distance={20}
        decay={1}
        color="#ffffff"
      />
      
     
     
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <group  rotation={[Math.PI / 2, Math.PI / .99, 0]} ref={innerRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Material001_0.geometry}
            material={materials['Material.001']}
            position={[-0.02, 2.305, -0.009]}
          >
            <ShaderMaterial material={materials['Material.001']}/>
          </mesh>
         
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pull_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0.091, 4.914, 0.021]}
          >
            <ShaderMaterial material={materials['Material.001']}/>

          </mesh>
    
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Spout_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0.11, 4.884, 0.007]}
          >
            <ShaderMaterial material={materials['Material.001']}/>

          </mesh>
            
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/juice-can.glb')
