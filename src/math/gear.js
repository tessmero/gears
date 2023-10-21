
class Gear {
    constructor(pos,cw){
        var n = randInt(3,15)
        this.pos = pos
        this.vel = v(0,0)
        
        var tw = global.toothWidth
        var r = tw * n
        var dr = tw
        this.r1 = r-dr
        this.r2 = r+dr
        
        this.n = n // number of teeth
        this.cw = cw // boolean clockwise
        
        this.tips = null //
        this.ao = 0
    }
   
    update(dt){
        //push on-screen
        var sc = global.screenCorners
        if( this.pos.x < sc[0].x ) this.pos.x = sc[0].x
        if( this.pos.x > sc[2].x ) this.pos.x = sc[2].x
        if( this.pos.y < sc[0].y ) this.pos.y = sc[0].y
        if( this.pos.y > sc[2].y ) this.pos.y = sc[2].y
        
        this.vel = this.vel.mul( 1.0 - global.friction )        
        this.pos = this.pos.add(this.vel.mul(dt))
    }
   
    draw(g,fill){
        var c = this.pos
        
        // angle offset due to spinning animation
        var oa = this.ao + twopi * (global.animState * global.animScale) / this.n
        if( this.cw ) oa *= -1
        
        // angle difference between adjacent teeth
        var da = twopi/this.n
        
        // how much to taper each tooth (radians)
        var off = global.toothTaper
        
        // prepare to save tooth locations for purposes 
        // of collisions with neighboring gears
        if( fill ) this.tips = []
        
        // start drawing
        g.beginPath()
        for( var i = 0 ; i < this.n ; i++ ){
            var a = oa + i*twopi/this.n
            a = [a,a+da/2,a+da/2+off,a+da-off]
            g.arc( c.x, c.y, this.r1, a[0], a[1] )
            g.arc( c.x, c.y, this.r2, a[2], a[3] )
            this.tips.push([ c.add(vp(a[2],this.r2)), c.add(vp(a[3],this.r2)) ])
        }
        g.closePath()
        if( fill ) {
            g.fill()
        } else {
            g.stroke()
        }
     
    }
}