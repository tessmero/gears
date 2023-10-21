
class Gear {
    constructor(pos,r1,r2,n,cw){
        this.pos = pos
        this.vel = v(0,0)
        
        this.r1 = r1
        this.r2 = r2
        this.n = n // number of teeth
        this.cw = cw // boolean clockwise
        
        this.m2 = Math.pow( avg(r1,r2), 2 )
        this.neighbors = [] // gear instances
    }
   
    update(dt){
    
        this.vel = this.vel.mul( 1.0 - global.friction )        
        this.pos = this.pos.add(this.vel.mul(dt))
        
        // maintain distance from neighbors
        this.neighbors.forEach( nbr => {
            
            var d = nbr.pos.sub(this.pos)
            var m2 = d.m2()
            
            var targetM2 = 2 * (this.m2 + nbr.m2)
            var dm2 = m2-targetM2
            
            this.vel = this.vel.add( vp( d.getAngle(), 
                dm2*global.allignForce*dt ) )
        })
    }
   
    draw(g){
        var c = this.pos
        
        // angle offset due to spinning animation
        var oa = twopi * (global.animState * global.animScale) / this.n
        if( this.cw ) oa *= -1
        
        // angle difference between adjacent teeth
        var da = twopi/this.n
        
        // how much to taper each tooth (radians)
        var off = .04
        
        g.beginPath()
        for( var i = 0 ; i < this.n ; i++ ){
            var a = oa + i*twopi/this.n
            a = [a,a+da/2,a+da/2+off,a+da-off]
            g.arc( c.x, c.y, this.r1, a[0], a[1] )
            g.arc( c.x, c.y, this.r2, a[2], a[3] )
        }
        g.closePath()
        g.stroke()
    }
}