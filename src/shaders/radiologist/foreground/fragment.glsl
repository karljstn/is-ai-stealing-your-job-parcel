varying vec2 vUv;

uniform float ratio;
uniform float pi;
uniform sampler2D renderTarget;
uniform vec2 resolution;

vec4 layer(vec4 foreground, vec4 background) {
    return foreground * foreground.a + background * (1.0 - foreground.a);
}


void main(){
    vec2 screenUv = gl_FragCoord.xy / resolution.xy;

    float nbLines = 100.0;
    float thickness = 0.002;
    // float lineColor = vec3(0.117, 0.172, 0.282);

    float wx = (sin(vUv.x*nbLines*ratio*(pi/2.0)) + 1.0) * 0.5;
    wx = step(wx, thickness);

    float wy = (sin(vUv.y*nbLines*(pi/2.0)) + 1.0) * 0.5;
    wy = step(wy, thickness);

    float lines = wx + wy;
    lines *= 0.1; 
    vec3 bgColor = vec3(0.019, 0.086, 0.211);

    vec3 col = bgColor + lines;

    gl_FragColor = vec4(col, 1.);
    gl_FragColor = layer(texture2D(renderTarget, screenUv), gl_FragColor);
}