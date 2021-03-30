varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

varying vec3 vPositionW;
varying vec3 vNormalW;

uniform float outline;

vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}

void main(){
    vec3 color = vec3(1., 0., 0.);

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelTerm = dot(viewDirection, vNormal);
    fresnelTerm = clamp(1. - fresnelTerm, 0., 1.);
    
    fresnelTerm = pow(fresnelTerm, 3.);
    // fresnelTerm = smoothstep(0., 0.9, fresnelTerm);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.); 
    gl_FragColor = vec4(color * fresnelTerm, outline); 


    //debug normals
    // gl_FragColor = vec4(packNormalToRGB(vNormal),1.);
}
