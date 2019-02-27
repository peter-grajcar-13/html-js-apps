var Vector3 = function (x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;

	this.magnitude = function () {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}
	this.plus = function (v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}
	this.minus = function (v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}
	this.divide = function (n) {
		return new Vector3(this.x/n, this.y/n, this.z/n);
	}
	this.times = function (n) {
		return new Vector3(this.x*n, this.y*n, this.z*n);
	}
	this.cross = function (v) {
		return new Vector3( this.y*v.z - this.z*v.y, this.z*v.x - this.x*v.z, this.x*v.y - this.y*v.x );
	}
	this.dot = function (v) {
		return this.x*v.x + this.y*v.y + this.z*v.z;
	}

	this.rotate = function ( axis, theta ){
		//rotation matrices
		switch(axis){
			case X_AXIS:
				var X = this.x
				var Y = this.y*Math.cos(theta) - this.z*Math.sin(theta);
				var Z = this.y*Math.sin(theta) + this.z*Math.cos(theta);
				return new Vector3( X, Y, Z );
				break;
			case Y_AXIS:
				var X = this.x*Math.cos(theta) + this.z*Math.sin(theta);
				var Y = this.y;
				var Z = -this.x*Math.sin(theta) + this.z*Math.cos(theta);
				return new Vector3( X, Y, Z );
				break;
			case Z_AXIS:
				var X = this.x*Math.cos(theta) - this.y*Math.sin(theta);
				var Y = this.x*Math.sin(theta) + this.y*Math.cos(theta);
				var Z = this.z;
				return new Vector3( X, Y, Z );
				break;
		}
	}
	this.rotateAround = function (v, a, b, c) {
		var d = this.minus(v);
		
		var X = d.x * ( Math.cos(b)*Math.cos(c) ) - d.y * ( Math.cos(b)*Math.sin(c) ) + d.z * Math.sin(b);
		var Y = d.x * ( Math.cos(a)*Math.sin(c) + Math.sin(a)*Math.sin(b)*Math.cos(c) ) + d.y * ( Math.cos(a)*Math.cos(c) - Math.sin(a)*Math.sin(b)*Math.sin(c) ) - d.z * ( Math.sin(a)*Math.cos(b) );
		var Z = d.x * ( Math.sin(a)*Math.sin(c) - Math.cos(a)*Math.sin(b)*Math.cos(c) ) + d.y * ( Math.sin(a)*Math.cos(c) + Math.cos(a)*Math.sin(b)*Math.sin(c) ) + d.z * ( Math.cos(a)*Math.cos(b) );
		d = new Vector3(X, Y, Z);

		return d.plus(v);
	}
}
var Vector2 = function (x, y){
	this.x = x;
	this.y = y;
}