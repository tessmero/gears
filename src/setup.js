

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousedown", mouseClick);
    
    
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    
    resetRand() // math/rng.js
    fitToContainer()
    resetGame()
    requestAnimationFrame(gameLoop);
}


function resetGame(){
    resetRand()
    global.autoResetCountdown = global.autoResetDelay
    
    // build gears
    var gs = []
    var n = 7
    for( var i = 0 ; i < n ; i++ ){
        gs.push(new Gear(
            v(randRange(.3,.7),randRange(.3,.7)),
            i%2
        ))
    }
    global.allGears = gs
    
    rebuildGearLinks()
    
}

function rebuildGearLinks(){
    
    var gs = global.allGears
    var odd = []
    var even = []
    gs.forEach( g => (g.cw?even:odd).push(g) )
    shuffle(even)
    shuffle(odd)
    gs = []
    while( (odd.length>0) && (even.length>0) ){
        var t = odd.pop()
        if( t ) gs.push(t)
        t = even.pop()
        if( t ) gs.push(t)
    }
    global.allGears = gs
    var n = gs.length
    gs.forEach(gear => gear.links = [])
    
    // build links between gears
    // neighboring gears align, otherwise repel
    var gl = []
    for( var i = 0 ; i < n ; i++ )
        for( var j = i+1 ; j < n ; j++ )
            gl.push( new Link( gs[i], gs[j], j != (i+1) ) ) 
    global.allLinks = gl
}


// check if line segment intersects any existing neighbor-links
function isSegmentClear(a,b){
    for( var i = 0 ; i < global.allLinks.length ; i++ ){
        var l = global.allLinks[i]
        if( l.repel ) continue
        if( segmentsIntersection( l.a.pos, l.b.pos, a, b) ) return false
    }
    return true
}

// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,50)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();

