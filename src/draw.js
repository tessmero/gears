
    
    
// Render graphics
function draw(fps, t) {
    var g = global.ctx
    var canvas = global.canvas
    g.fillStyle = global.backgroundColor
    g.fillRect( -10,-10,30,30 )

    // draw gears
    g.strokeStyle = 'white'
    g.fillStyle = 'gray'
    g.lineWidth = .005
    global.allGears.forEach( b => b.draw(g,true) )
    global.allGears.forEach( b => b.draw(g) )
    
    
    // debug draw corners
    if( false ){
        global.screenCorners.forEach( c => {
            g.fillStyle = 'red'
            g.beginPath()
            g.moveTo(c.x,c.y)
            g.arc(c.x,c.y,.1,0,twopi)
            g.fill()
        })
    }

    // debug draw mouse
    if( global.debugMouse ){
        let c = global.mousePos
        g.fillStyle = 'red'
        g.beginPath()
        g.moveTo(c.x,c.y)
        g.arc(c.x,c.y,.01,0,twopi)
        g.fill()
    }

    //debug
    if( global.debugPoints ){
        global.debugPoints.forEach(c => {
            g.fillStyle = c[1]
            c = c[0]
            g.beginPath()
            g.moveTo(c.x,c.y)
            g.arc(c.x,c.y,.01,0,twopi)
            g.fill()
        })
    }
}