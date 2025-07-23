import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export const ShaderMaterial = ({ material }: { material: THREE.MeshStandardMaterial }) => {
  const { size } = useThree();
  const scrollProgress = useRef(0);
  const effectIntensity = useRef(0);
  const fadeTimeout = useRef<number | null>(null);
  const noiseTexture = useRef<THREE.Texture>(null);

  useEffect(() => {
    if (!material) return;

    // Disable face culling to ensure effect appears on both sides
    // Critical settings for visibility
    // material.side = THREE.DoubleSide;
    // material.transparent = true;
    // material.alphaTest = 0.1;
    material.needsUpdate = true;

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
  }, [material]);

  useEffect(() => {
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      // Add uniforms
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uResolution = { value: new THREE.Vector2(size.width, size.height) };
      shader.uniforms.uEffectIntensity = { value: 0 };
      shader.uniforms.uChannel1 = { value: noiseTexture.current };

          // Vertex shader modifications
          shader.vertexShader = `
          varying vec2 vUv;
          varying vec3 vNormal12;
          varying vec3 vViewPosition12;
          ${shader.vertexShader}
        `.replace(
          'void main() {',
          `void main() {
            vUv = uv;
            vNormal12 = normalize(normalMatrix * normal);
            vec4 mvPosition12 = modelViewMatrix * vec4(position, 1.0);
            vViewPosition12 = -mvPosition12.xyz;
          `
        );
  
        // Fragment shader with view-dependent effect
        shader.fragmentShader = `
          uniform float uTime;
          uniform vec2 uResolution;
          uniform float uEffectIntensity;
          uniform sampler2D uChannel1;
          varying vec2 vUv;
          varying vec3 vNormal12;
          varying vec3 vViewPosition12;
        
          
         // Rotate UV coordinates by 90 degrees (π/2 radians)
        vec2 rotateUV(vec2 uv, float angle) {
          float mid = 0.5;
          uv -= mid;
          mat2 rot = mat2(cos(angle), -sin(angle), 
                         sin(angle), cos(angle));
          uv = rot * uv;
          uv += mid;
          return uv;
        }
        
        vec3 bufferAGradient(vec2 uv) {
          float falloff = max(0.0, 1.0 - pow(32.0 * abs(0.5 - uv.x), 0.15));
          return vec3(0.25, 0.6, 1.5) * falloff * 2.0;
        }
        
        vec3 bolt(vec2 uv, float speed, float freq) {
          vec3 col = vec3(0.0);
          for (float i=0.0; i<0.05; i+=0.01) {
            vec2 nuv = uv;
            nuv.x += 0.25*(0.5-texture(uChannel1,vec2((uTime - i) * speed, nuv.y * freq)).x)*pow(0.5-abs(0.5-uv.y),0.5);
            col += 0.7*bufferAGradient(nuv);
          }
          return col;
        }
        
        vec3 lightningEffect(vec2 uv) {
          // Apply 90 degree rotation to UV coordinates
          vec2 rotatedUV = rotateUV(uv + .3, 0.); // 1.5708 radians = 90 degrees
          vec3 col = vec3(0.0);
          col += bolt(rotatedUV, 0.53534, 0.21);
          col += bolt(rotatedUV, 0.64563, 0.22);
          col += bolt(rotatedUV, 0.73425, 0.23);
          return col;
        }
          ${shader.fragmentShader}
        `.replace(
          'vec4 diffuseColor = vec4( diffuse, opacity );',
          `vec4 diffuseColor = vec4(diffuse, opacity);
          
          // Calculate lightning effect
          vec3 lightning = lightningEffect(vUv);
          
          // Make effect view-dependent for better visibility
          float viewDot = abs(dot(normalize(vViewPosition12), vNormal12));
          float visibility = mix(0.8, 1.2, viewDot);
          
          // Apply effect with screen blend mode
          diffuseColor.rgb = 1.0 - (1.0 - diffuseColor.rgb) * (1.0 - lightning * uEffectIntensity * visibility);
          
          // Add emissive component
          diffuseColor.rgb += lightning * uEffectIntensity * 20. * visibility;`
      );

     

      material.userData.shader = shader;
    };

    material.needsUpdate = true;

    
  
  }, [material, size]);

  useEffect(()=>{
    const fadeOut = () => {
      effectIntensity.current = Math.max(0, effectIntensity.current - 0.010);
      // console.log("Effect intensity", effectIntensity.current);
      if (effectIntensity.current > 0) {
        requestAnimationFrame(fadeOut);
      }
    };
  
    const handleScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / (window.innerHeight * 10), 1.0);
     
      if (scrollProgress.current > 0.1082 &&  scrollProgress.current <1.14) {
        effectIntensity.current = 1;
    
        setTimeout(() => {
          fadeOut();
        }, 500);
      } else {
        effectIntensity.current = 0;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (fadeTimeout.current !== null) {
        window.clearTimeout(fadeTimeout.current);
      }
    };
  })

  useFrame((state) => {
    if (!material?.userData?.shader) return;

    const { shader } = material.userData;
    shader.uniforms.uTime.value = state.clock.getElapsedTime();
    shader.uniforms.uResolution.value.set(size.width, size.height);
    shader.uniforms.uEffectIntensity.value = effectIntensity.current;
    
    if (noiseTexture.current && !shader.uniforms.uChannel1.value) {
      shader.uniforms.uChannel1.value = noiseTexture.current;
    }
  });

  return null;
};