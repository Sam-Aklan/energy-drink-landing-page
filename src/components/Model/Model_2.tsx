import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF, Environment, SoftShadows } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { ShaderMaterial } from '../../shaders/ShaderMaterial'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshBasicMaterial
    Alminium: THREE.MeshBasicMaterial
    ['Material.003']: THREE.MeshBasicMaterial
  }
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const gltf = useGLTF('/model/monster_white.glb') as unknown as GLTFResult
  const { materials, nodes } = gltf

  // Convert materials while preserving all textures and maps
  const convertedMaterials = useMemo(() => {
    return {
      labelMaterial: new THREE.MeshStandardMaterial({
        map: materials['Material.001'].map, // Preserve texture
        color: materials['Material.001'].color,
        roughness: 0.4,
        metalness: 0.1,
        transparent: materials['Material.001'].transparent,
        alphaTest: 0.1
      }),
      aluminumMaterial: new THREE.MeshStandardMaterial({
        map: materials.Alminium.map, // Preserve texture
        color: materials.Alminium.color,
        roughness: 0.2,
        metalness: 1.0,
        envMapIntensity: 1.5
      }),
      topMaterial: new THREE.MeshStandardMaterial({
        map: materials['Material.003'].map, // Preserve texture
        color: materials['Material.003'].color,
        roughness: 0.3,
        metalness: 0.8
      })
    }
  }, [materials])

  React.useEffect(() => {
    return () => {
      Object.values(convertedMaterials).forEach(m => m.dispose())
      gltf.scene.traverse(child => {
        if ((child as THREE.Mesh).geometry) {
          (child as THREE.Mesh).geometry.dispose()
        }
        if ((child as THREE.Mesh).material) {
          const material = (child as THREE.Mesh).material
          if (Array.isArray(material)) material.forEach(m => m.dispose())
          else material.dispose()
        }
      })
    }
  }, [gltf, convertedMaterials])

  return (
    <>
      
      <group {...props} dispose={null} rotation={[0, Math.PI/6 - .7,0]}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={2}
        castShadow
        shadow-mapSize={2048}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.8}
        color="#aaccff"
      />
      <directionalLight
        position={[0, 5, -10]}
        intensity={1.5}
        color="#ffdd99"
      />
      <pointLight
        position={[0, -2, 0]}
        intensity={0.5}
        distance={6}
        color="#ffffee"
      />
      
      <SoftShadows size={25} focus={0.6} samples={10} />
        <group position={[0, 0, 0]} scale={0.476} >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={convertedMaterials.labelMaterial}

          >
            <ShaderMaterial material={convertedMaterials.labelMaterial}/>
          </mesh>
          

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={convertedMaterials.aluminumMaterial}
          >
            <ShaderMaterial material={convertedMaterials.aluminumMaterial}/>
          </mesh>
          
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={convertedMaterials.topMaterial}
          >
            <ShaderMaterial material={convertedMaterials.topMaterial}/>
          </mesh>
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/model/monster_white.glb')