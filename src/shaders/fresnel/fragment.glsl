varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

varying vec3 vPositionW;
varying vec3 vNormalW;

uniform vec3 fresnelColor;

vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}

void main(){
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelFactor = dot(viewDirection, vNormal);
    float inverseFresnelFactor = clamp(1. - fresnelFactor, 0., 1.);
    
    // Shaping function
    fresnelFactor = pow(fresnelFactor, 3.);
    inversefresnelFactor = pow(inverseFresnelFactor, 3.);

    gl_FragColor = vec4(fresnelFactor * baseColor + fresnelColor * inversefresnelFactor, 1.); 
}
