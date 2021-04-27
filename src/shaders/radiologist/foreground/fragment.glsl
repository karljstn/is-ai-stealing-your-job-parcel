varying vec2 vUv;

uniform float ratio;
uniform float pi;
uniform sampler2D uRenderTarget;
uniform vec2 resolution;

uniform float uLines;
uniform float uThickness;

vec4 layer(vec4 foreground, vec4 background) {
    return foreground * foreground.a + background * (1.0 - foreground.a);
}


void main(){
    vec2 screenUv = gl_FragCoord.xy / resolution.xy;
    // vec2 screenUv = gl_FragCoord.xy * 1./ratio / (resolution.xy);

    // float lineColor = vec3(0.117, 0.172, 0.282);

    float wx = (sin(vUv.x*uLines*ratio*(pi/2.0)) + 1.0) * 0.5;
    wx = step(wx, uThickness);

    float wy = (sin(vUv.y*uLines*(pi/2.0)) + 1.0) * 0.5;
    wy = step(wy, uThickness);

    float lines = wx + wy;
    lines *= 0.1; 
    vec3 bgColor = vec3(0.019, 0.086, 0.211);

    vec3 col = bgColor + lines;

    gl_FragColor = vec4(col, 1.);
    gl_FragColor = layer(texture2D(uRenderTarget, vUv), gl_FragColor);
}