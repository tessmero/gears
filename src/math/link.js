// link between two neighboring gears

class Link {
    
    constructor(a,b,repel=false){
        this.a = a
        this.b = b
        this.repel = repel
        
        var repelMargin = .05
        
        this.targetM2 = Math.pow( this.repel ? 
            (a.r2+b.r2+repelMargin) : 
            (a.r1 + b.r2), 2 )
        
        
    }

   
    update(dt){
        var a = this.a
        var b = this.b
        
        // maintain distance
        var d = a.pos.sub(b.pos)
        var m2 = d.m2()
        var dm2 = m2-this.targetM2
        if( this.repel && (dm2>0) ) return
        if( this.repel ) dm2 *= 2
        var accel = vp( d.getAngle(), dm2*global.allignForce*dt )
        a.vel = a.vel.sub(accel)
        b.vel = b.vel.add(accel)
        
        
        if( this.repel ) return
        
        //
        var da = global.spinAllignForce*dt
        if( a.cw ) da *= -1
        
        // check tip intersections
        if( (!a.tips) || (!b.tips) ) return
        for( var ai = 0 ; ai < a.n ; ai++ ){
            for( var bi = 0 ; bi < b.n ; bi++ ){
                var si = segmentsIntersection( a.pos, a.tips[ai][0], b.tips[bi][0], b.tips[bi][1] )
                if( si ) {
                    if( global.debugPoitns )global.debugPoints.push([si,'red'])
                    a.ao += da
                    b.ao -= da
                    return
                }
                si = segmentsIntersection( a.pos, a.tips[ai][1], b.tips[bi][0], b.tips[bi][1] )
                if( si ) {
                    if( global.debugPoitns )global.debugPoints.push([si,'blue'])
                    a.ao -= da
                    b.ao += da
                    return
                }
                si = segmentsIntersection( b.pos, b.tips[bi][0], a.tips[ai][0], a.tips[ai][1] )
                if( si ) {
                    if( global.debugPoitns )global.debugPoints.push([si,'green'])
                    a.ao += da
                    b.ao -= da
                    return
                }
                si = segmentsIntersection( b.pos, b.tips[bi][1], a.tips[ai][0], a.tips[ai][1] )
                if( si ) {
                    if( global.debugPoitns )global.debugPoints.push([si,'yellow'])
                    a.ao -= da
                    b.ao += da
                    return
                }
            }
        }
    }
}