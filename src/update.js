

function update(dt) { 
    global.t += dt

    fitToContainer()  
    
    // update base gear physics
    if( global.debugPoitns ) global.debugPoints = [] 
    global.allGears.forEach( gear => gear.update(dt) )
        
    // align/repel gears based on planned chain
    global.allGears.forEach( g => g.repulsionDisabled = g.links.some(l => 
        (!l.repel) && (!l.isInterlocked)
    ))
    global.allLinks.forEach( lk => lk.update(dt) )
            
    // cycle out one gear if necessary
    if( global.autoMoveCountdown > 0 ){
        global.autoMoveCountdown -= dt
        
    } else {
        spawnGear()
    }
        
    // main animation
    let p = global.animPeriod
    let pindex = Math.floor(global.t / p)
    let r = (global.t % p) / p
    global.animState = Math.cos(r*twopi-pi)/2+.5
}


function spawnGear( pos=null ){
    if( pos == null ) pos = v(randRange(.3,.7),randRange(.3,.7))
    
    global.autoMoveCountdown = global.autoMoveDelay
    global.allGears.shift()
    global.allGears.push(new Gear(
        pos,
        !global.allGears[global.allGears.length-1].cw
    ))
    rebuildGearLinks()
}


var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var dimension = Math.min(cvs.width, cvs.height);
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / dimension
        var yr = -global.canvasOffsetY / dimension
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
        global.screenCenter = v(.5,.5)
    }
}