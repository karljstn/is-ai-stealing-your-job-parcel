uniform vec2 size;

void main(){
    gl_Position = vec4(size.x * position.x, size.y * position.y - 0.05, 0.0, 1.0);
}