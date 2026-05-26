const vertexShaderTxt = `
precision mediump float;

uniform mat4 mModel; //rotacja, skalowanie
uniform mat4 mView;  //gdzie patrzy kamera
uniform mat4 mProj;  //jak działa soczewka

attribute vec3 vertPosition;
attribute vec2 texCoord;

varying vec2 fragTextCoord;

void main() {
    fragTextCoord = texCoord;
    gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
}
`