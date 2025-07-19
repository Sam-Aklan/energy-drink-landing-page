export const fragmentShaderFn = /*glsl*/ `
   vec3 bufferAGradient(vec2 uv) {
          float falloff = max(0.0, 1.0 - pow(32.0 * abs(0.5 - uv.x), 0.15));
          return vec3(0.25, 0.5, 1.0) * falloff;
        }
        
        vec3 bolt(vec2 uv, float speed, float freq) {
          vec3 col = vec3(0.0);
          for (float i=0.0; i<0.05; i+=0.01) {
            vec2 nuv = uv;
            nuv.x += 0.25*(0.5-texture(uChannel1,vec2((uTime - i) * speed, nuv.y * freq)).x)*pow(0.5-abs(0.5-uv.y),0.5);
            col += 0.5*bufferAGradient(nuv);
          }
          return col;
        }
        
        vec2 rotateUV(vec2 uv, float rotation) {
          float mid = 0.5;
          return vec2(
            cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
            cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
          );
        }
        
        vec3 lightningEffect(vec2 uv) {
          // Rotate UV coordinates 90 degrees (PI/2 radians)
          vec2 rotatedUV = rotateUV(uv, 1.5708);
          vec3 col = vec3(0.0);
          col += bolt(rotatedUV, 0.53534, 0.21);
          col += bolt(rotatedUV, 0.64563, 0.22);
          col += bolt(rotatedUV, 0.73425, 0.23);
          return col;
        }
        
`