const Triangle = function () {
    let canvas_color = [0.25, 0.44, 0.8]; // RGB
    const canvas = document.getElementById('main-canvas');
    const gl = canvas.getContext('webgl2');
    
    gl.clearColor(...canvas_color, 1.0);   // rgba
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    // gl.frontFace(gl.CCW);
    // gl.cullFace(gl.FRONT);


    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);     // program will use those shaders
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.validateProgram(program);
    
    function checkShaderCompile(shader) {
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('shader not compiled', gl.getShaderInfoLog(shader));
        }
    }
    
    function checkLink(program) {
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        }
    }

    // let triangleVertices =
    // [ //  X,  Y, Z
    //     0.0, 0.5, 0.0,
    //     -0.5, -0.5, 0.0,
    //     0.5, -0.5, 0.0,
    // ];

    let squareVerticles =
        [
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,

            // Left
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,

            // Right
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,

            // Front
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,

            // Bottom
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
        ];

    let colors =
        [
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,

            0.8, 0.0, 0.2,
            0.0, 1.0, 1.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,

            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,

            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,

            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,

            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.2, 1.0,
            0.5, 1.0, 0.0,
        ]

    const squareIndices =
        [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23,
        ];

    boxTexCoords = [
        0, 0,
        0, 1,
        1, 1,
        1, 0,


        0, 0,
        1, 0,
        1, 1,
        0, 1,

        // second
        1, 1,
        0, 1,
        0, 0,
        1, 0,

        1, 1,
        1, 0,
        0, 0,
        0, 1,


        0, 0,
        0, 1,
        1, 1,
        1, 0,


        1, 1,
        1, 0,
        0, 0,
        0, 1
    ];

    const triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVerticles), gl.STATIC_DRAW);

    const posAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        posAttribLocation,
        3,  // number of components
        gl.FLOAT, // type of that attrib
        0,      // if the thing should be normalized
        3*Float32Array.BYTES_PER_ELEMENT, // STRIDE offset in bytes
        0, // offset specifying an offset in bytes
    );
    gl.enableVertexAttribArray(posAttribLocation);

    const squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareIndices), gl.STATIC_DRAW);

    const textureAttribLocation = gl.getAttribLocation(program, 'texCoord');
    const textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxTexCoords),gl.STATIC_DRAW);

    gl.vertexAttribPointer(
        textureAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2*Float32Array.BYTES_PER_ELEMENT,
        0  // ← DODAJ TEN ARGUMENT (offset = 0)
    );
    gl.enableVertexAttribArray(textureAttribLocation);

    const boxTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,gl.RGBA,
        gl.UNSIGNED_BYTE,
        document.getElementById('img')
    );
    gl.bindTexture(gl.TEXTURE_2D, boxTexture);

    gl.activeTexture(gl.TEXTURE0);
    const samplerLoc = gl.getUniformLocation(program, 'sampler');
    gl.uniform1i(samplerLoc, 0);
    gl.useProgram(program);     // specify which program to use
    
    const modelMatrix = gl.getUniformLocation(program, 'mModel');
    const viewMatrix = gl.getUniformLocation(program, 'mView');
    const projMatrix = gl.getUniformLocation(program, 'mProj');

    const glm = glMatrix;
    let mMod = glm.mat4.create();
    let mView = glm.mat4.create();
    glm.mat4.lookAt(mView, [0,0,-10], [0,0,0], [0,1,0]);
    let mProj = glm.mat4.create();
    glm.mat4.perspective(mProj, glm.glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 1000.0);

    gl.uniformMatrix4fv(modelMatrix, gl.FALSE, mMod);
    gl.uniformMatrix4fv(viewMatrix, gl.FALSE, mView);
    gl.uniformMatrix4fv(projMatrix, gl.FALSE, mProj);

    // Alokacja obiektów glMatrix przed pętlą dla wydajności i uniknięcia błędów typu danych
    let angle = performance.now();
    let translation = glm.vec3.create(); 
    let rotation = glm.quat.create(); 
    let scaling = glm.vec3.create();

    const loop = function () {
        gl.clearColor(...canvas_color, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const scale = 1.0;
        const scaling = glm.vec3.fromValues(scale, scale, scale);

        let rotation_direction = [0, 1, 0];
        let angle = performance.now() / 1000;

        let translation = glm.vec3.fromValues(0.0, 0.0, -2.0);
        let rotation = glm.quat.create();
        glm.quat.setAxisAngle(rotation, rotation_direction, angle);

        glm.mat4.fromRotationTranslationScale(mMod, rotation, translation, scaling);
        gl.uniformMatrix4fv(modelMatrix, false, mMod);
        gl.drawElements(gl.TRIANGLES, squareIndices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};