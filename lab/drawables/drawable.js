class Drawable extends Transform2
{
	constructor(gl, program, positionArray, indexArray, position=new Vector2(), rotation=0, scale=new Vector2(1,1))
	{
		super(position, rotation, scale);

		this.gl = gl;
		this.program = program;

		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');

		this.positionArray = positionArray;
		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positionArray, gl.STATIC_DRAW);
		this.positionAttribLocation = this.gl.getAttribLocation(this.program, "vertPosition");
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.indexArray = indexArray;
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}

	activate()
	{
		this.update();

		this.gl.useProgram(this.program);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.vertexAttribPointer(
			this.positionAttribLocation,
			2,
			this.gl.FLOAT,
			this.gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.uniformMatrix3fv(this.mWorldUniformLocation, this.gl.FALSE, this.mWorld);
	}

	draw()
	{
		this.activate();

		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.indexArray.length,
			this.gl.UNSIGNED_SHORT,
			0
		);

		this.deactivate();
	}

	deactivate()
	{
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.disableVertexAttribArray(this.positionAttribLocation);
	}
}

class UniformColorDrawable extends Drawable
{
	constructor(gl, program, positionArray, indexArray, color=new Float32Array([0.0,0.0,0.0]), position=new Vector2(), rotation=0, scale=new Vector2(1,1))
	{
		super(gl, program, positionArray, indexArray, position, rotation, scale);

		this.color = color;
		this.colorUniformLocation = this.gl.getUniformLocation(this.program, "color");
	}

	activate()
	{
		super.activate();
		this.gl.uniform3fv(this.colorUniformLocation, this.color);
	}
}

class MultiColorDrawable extends Drawable
{
	constructor(gl, program, positionArray, indexArray, colorArray, position=new Vector2(), rotation=0, scale=new Vector2(1,1))
	{
		super(gl, program, positionArray, indexArray, position, rotation, scale);

		this.colorArray = colorArray;
		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);
		this.colorAttribLocation = this.gl.getAttribLocation(this.program, "vertColor");
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	activate()
	{
		super.activate();

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.enableVertexAttribArray(this.colorAttribLocation);
		this.gl.vertexAttribPointer(
			this.colorAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}

	deactivate()
	{
		super.deactivate();
		this.gl.disableVertexAttribArray(this.colorAttribLocation);
	}
}