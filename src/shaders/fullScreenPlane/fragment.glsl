#define PI 3.14159265359
#pragma glslify: snoise = require('glsl-noise/simplex/3d');

uniform float uTime;
uniform float uMixFactor;
uniform vec3 uColorInitial;
uniform vec3 uColorFinal;
uniform vec2 uMousePos; // vec2(0.->1., 0.->1.)
uniform float uAspectHorizontal;
// uniform vec2 uTargetOffset;
varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

void main(){
    float freq = 0.0003;
    float amp = 1.;
    float normalizedSin = (sin(uTime * freq) + 1.) / 2.;
    vec2 sinVec = vec2(normalizedSin * amp);

    vec2 uv = rotate(vUv, PI * 2. * sinVec.x);

    vec2 movingTarget = uv - vec2(sinVec.y, 0);
    movingTarget.x *= uAspectHorizontal;

    vec2 center = uv - 0.5;
    center.x *= uAspectHorizontal;

    vec2 mouse = uMousePos - uv;
    mouse.x *= uAspectHorizontal;

    // Center Circle
    float distTarget = length(movingTarget);
    float alphaTarget = smoothstep(0.2, 0.199, distTarget); 

    // Center Circle
    float distCenter = length(center);
    float alphaCenter = smoothstep(0.2, 0.199, distCenter); 

    // Mouse Circle
    float distMouse = length(mouse);
    float alphaMouse = smoothstep(0.2, 0.199, distMouse); 

    // float alpha = alphaMouse + alphaCenter;
    float alpha = alphaTarget;

    vec3 colorMix = mix(uColorInitial, uColorFinal, uMixFactor);

    // float noise = snoise(vec3(vUv, sin(uTime * 0.001)));

    float angle = atan(uv.x - 0.5, uv.y - 0.5); // -PI -> PI
    angle /= PI * 2.; // -0.5->0.5
    angle += 0.5;
    // vec3 color = vec3(angle); 

    // vec3 color = vec3(noise);
    vec3 color = colorMix;

    

    gl_FragColor = vec4(color, alpha);

    // Debug
    // gl_FragColor = vec4(vec3(uMousePos.x * uMousePos.y, 0., 0.), 1.);
}