varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// varying vec3 vPositionW;
// varying vec3 vNormalW;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // vUv = uv;
    vNormal = normalize(vec3(mat3(modelMatrix) * normal));
    vPosition = modelPosition.xyz;

    // vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix );
	// vNormalW = normalize( normal * mat3(modelMatrix) );
}