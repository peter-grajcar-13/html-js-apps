function getPlaneIntersection ( P0, P1, V0, V1, V2, ray=true ){
	//Normal vector
	var N = V1.minus(V0).cross(V2.minus(V0));
	if( N.dot( V0.minus(P0) ) != 0){
		var r = ( N.dot( V0.minus(P0) ) )/( N.dot( P1.minus(P0) ) );
		if(ray && r < 0) //ray
			return null;

		var I = parametricLine(P0, P1, r);

		return I;
	}else{
		return null;
	}
}
function getSegmentPlaneIntersection ( P0, P1, V0, V1, V2 ){
	//Normal vector
	var N = V1.minus(V0).cross(V2.minus(V0));
	if( N.dot( V0.minus(P0) ) != 0){
		var r = ( N.dot( V0.minus(P0) ) )/( N.dot( P1.minus(P0) ) );
		if( !(r >= 0 && r <= 1) )
			return null;

		var I = parametricLine(P0, P1, r);

		return I;
	}else{
		return null;
	}
}
function getTriangleIntersection ( P0, P1, V0, V1, V2, ray=true ){
	//Normal vector
	var N = V1.minus(V0).cross(V2.minus(V0));
	if( N.dot( V0.minus(P0) ) != 0){
		var r = ( N.dot( V0.minus(P0) ) )/( N.dot( P1.minus(P0) ) );
		if(ray && r < 0) //ray
			return null;

		var I = parametricLine(P0, P1, r);

		var u = V1.minus(V0);
		var v = V2.minus(V0);
		var w = I.minus(V0);
		var d = u.dot(v)*u.dot(v) - u.dot(u)*v.dot(v);

		var s = ( u.dot(v)*w.dot(v) - v.dot(v)*w.dot(u) )/d;
		var t = ( u.dot(v)*w.dot(u) - u.dot(u)*w.dot(v) )/d;

		if( s >= 0 && t >= 0 && s+t <= 1 )
			return I;
		else
			return null;
	}else{
		return null;
	}
}
function getQuadIntersection (P0, P1, V0, V1, V2, V3, ray=true) {
	var I = getTriangleIntersection(P0, P1, V0, V1, V2, ray);
	if(I == null){
		I = getTriangleIntersection(P0, P1, V2, V3, V0, ray);
		return I;
	}else
		return I;
}

function parametricLine (P0, P1, r) {
	return P0.plus( P1.minus(P0).times(r) );
}

function areCoplanar (P0, P1, P2, P3){
	if ( Math.round(10e10*P2.minus(P0).dot( P1.minus(P0).cross( P3.minus(P2) ) ) )/10e10 == 0)
		return true;
	else
		return false;
}

function triangleArea(A, B, C){
	c = C.minus(A);
	b = B.minus(A);
	var angle = Math.acos( c.dot(b)/(c.magnitude() * b.magnitude()) );
	return .5 * c.magnitude() * b.magnitude() * Math.sin(angle);
}
