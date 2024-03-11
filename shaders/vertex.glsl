#pragma glslify: snoise3 =  require(glsl-noise/simplex/3d);

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}