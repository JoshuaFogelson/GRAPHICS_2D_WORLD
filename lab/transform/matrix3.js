// This is a minimal class for 3x3 matrices.
// All matrices are Float32Arrays with 9 elements (column major)

class Matrix3
{
	static identity()
	{
		return new Float32Array([
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		]);
	}

	static mul(m1, m2)
	{
		return new Float32Array([
			m1[0]*m2[0] + m1[3]*m2[1] + m1[6]*m2[2], m1[1]*m2[0] + m1[4]*m2[1] + m1[7]*m2[2], m1[2]*m2[0] + m1[5]*m2[1] + m1[8]*m2[2],
			m1[0]*m2[3] + m1[3]*m2[4] + m1[6]*m2[5], m1[1]*m2[3] + m1[4]*m2[4] + m1[7]*m2[5], m1[2]*m2[3] + m1[5]*m2[4] + m1[8]*m2[5],
			m1[0]*m2[6] + m1[3]*m2[7] + m1[6]*m2[8], m1[1]*m2[6] + m1[4]*m2[7] + m1[7]*m2[8], m1[2]*m2[6] + m1[5]*m2[7] + m1[8]*m2[8],
		]);
	}

	static prod(matrices)
	{
		var result = matrices[0];
		for (var i = 1; i < matrices.length; i++)
		{
			result = Matrix3.mul(result, matrices[i]);
		}
		return result;
	}

	// Complete the methods below.
	// Don't forget, the matrices are in column major!

	// TODO
	static translation(v)
	{
		return new Float32Array([
			// Fill in the array for a 2D translation by (v.x, v.y)
		]);
	}

	// TODO
	static rotation(theta)
	{
		return new Float32Array([
			// Fill in the array for a 2D rotation by theta
		]);
	}

	// TODO
	static scale(v)
	{
		return new Float32Array([
			// Fill in the array for a 2D scale by (v.x, v.y)
		]);
	}

	// TODO
	static worldMatrix(position, rotation, scale)
	{
		// Calculate the WorldMatrix
		// (use the other Matrix3 methods)
	}
}