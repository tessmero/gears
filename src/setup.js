

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
    var n = global.allGears.length
    
    // build links between gears
    // neighboring gears align, otherwise repel
    var gl = []
    for( var i = 0 ; i < n ; i++ )
        for( var j = i+1 ; j < n ; j++ )
            gl.push( new Link( gs[i], gs[j], j != (i+1) ) ) 
    global.allLinks = gl
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

