varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

varying vec3 vPositionW;
varying vec3 vNormalW;

uniform vec3 baseColor;
uniform float outline;
uniform sampler2D baseTex;

vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}

void main(){
    vec4 texelColor = texture2D(baseTex, vUv);
	// vec3 texelLitColor = texelColor.xyz += vec3(0.1, 0.1, 0.1);

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelTerm = dot(viewDirection, vNormal);

    fresnelTerm = clamp(1. - fresnelTerm, 0., 1.);
    fresnelTerm = pow(fresnelTerm, 3.);
    // fresnelTerm = smoothstep(0., 0.9, fresnelTerm);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.); 
    // gl_FragColor = vec4(texelColor * fresnelTerm * outline); 
    
    gl_FragColor = texelColor;
    // gl_FragColor = vec4(vec3(vUv.x, vUv.y, 0.0), 1.0);

    // gl_FragColor = vec4(clamp(texelLitColor + uFresnelColor * inverseFresnelFactor, 0., 1.), 1.);



    //debug normals
    // gl_FragColor = vec4(packNormalToRGB(vNormal),1.);
}
