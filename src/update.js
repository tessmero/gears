

function update(dt) { 
    global.t += dt

    fitToContainer()  
    
    global.debugPoints = []
    global.allGears.forEach( gear => gear.update(dt) )
    global.allLinks.forEach( lk => lk.update(dt) )
            
    if( true ){
        if( false && (global.autoMoveCountdown > 0) ){
            global.autoMoveCountdown -= dt
            
        } else {
            
            // main animation
            let p = global.animPeriod
            let pindex = Math.floor(global.t / p)
            let r = (global.t % p) / p
            global.animState = Math.cos(r*twopi-pi)/2+.5
        }
    }
}



var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var dimension = avg(cvs.width, cvs.height);
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / global.canvasScale
        var yr = -global.canvasOffsetY / global.canvasScale
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
        global.screenCenter = v(.5,.5)
    }
}