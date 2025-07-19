import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { fragmentShaderFn } from './thunderBolt';

export const ShaderMaterial = ({ material }: { material: THREE.MeshStandardMaterial }) => {
  const { size } = useThree();
  const scrollProgress = useRef(0);
  const effectIntensity = useRef(0);
  const fadeTimeout = useRef<number>(0);
  const noiseTexture = useRef<THREE.Texture>(null);

  // Load noise texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    noiseTexture.current = loader.load(
      '/model/channel1_bolt.png',
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        if (material.userData?.shader) {
          material.userData.shader.uniforms.uChannel1.value = texture;
        }
      }
    );
    
    return () => {
      if (noiseTexture.current) noiseTexture.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uResolution = { value: new THREE.Vector2(size.width, size.height) };
      shader.uniforms.uEffectIntensity = { value: 0 };
      shader.uniforms.uChannel1 = { value: noiseTexture.current };

      // Vertex shader
      shader.vertexShader = `
        varying vec2 vUv;
        ${shader.vertexShader}
      `.replace(
        'void main() {',
        `void main() {
          vUv = uv;
        `
      );

      // Fragment shader with lightning effect
      shader.fragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uEffectIntensity;
        uniform sampler2D uChannel1;
        varying vec2 vUv;
        
        ${fragmentShaderFn}
        
        ${shader.fragmentShader}
      `.replace(
        'vec4 diffuseColor = vec4( diffuse, opacity );',
        `vec4 diffuseColor = vec4(diffuse, opacity);
        vec3 lightning = lightningEffect(vUv);
        diffuseColor.rgb = mix(diffuseColor.rgb, lightning, uEffectIntensity * 1.2);`
      );

      material.userData.shader = shader;
    };

    material.needsUpdate = true;

    const handleScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / (window.innerHeight * 2), 1.0);
      effectIntensity.current = 1.0;
      
      if (fadeTimeout.current !== undefined) {
        window.clearTimeout(fadeTimeout.current);
      }
      
      fadeTimeout.current = window.setTimeout(() => {
        const fadeOut = () => {
          effectIntensity.current = Math.max(0, effectIntensity.current - 0.016);
          if (effectIntensity.current > 0) {
            requestAnimationFrame(fadeOut);
          }
        };
        fadeOut();
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (fadeTimeout.current !== undefined) {
        window.clearTimeout(fadeTimeout.current);
      }
    };
  }, [material, size]);

  useFrame((state) => {
    if (!material?.userData?.shader) return;

    const { shader } = material.userData;
    shader.uniforms.uTime.value = state.clock.getElapsedTime();
    shader.uniforms.uResolution.value.set(size.width, size.height);
    shader.uniforms.uEffectIntensity.value = effectIntensity.current;
    
    // Update texture if loaded late
    if (noiseTexture.current && !shader.uniforms.uChannel1.value) {
      shader.uniforms.uChannel1.value = noiseTexture.current;
    }
  });

  return null;
};