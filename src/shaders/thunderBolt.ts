export const fragmentShaderFn = /*glsl*/ `
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
           vec2 rotatedUV = rotateUV(uv + .3, 0.); // shift by .3 rotate by 0 angle
           vec3 col = vec3(0.0);
           col += bolt(rotatedUV, 0.53534, 0.21);
           col += bolt(rotatedUV, 0.64563, 0.22);
           col += bolt(rotatedUV, 0.73425, 0.23);
           return col;
         }
`