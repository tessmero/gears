

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", mouseMove);
    
    // https://stackoverflow.com/a/63469884
    var previousTouch;
    cvs.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        mouseMove({
            clientX: touch.pageX,
            clientY: touch.pageY
        })
        e.preventDefault()
    });
    
    
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
    
    var gs = []
    
    for( var i = 0 ; i < 2 ; i++ ){
        gs.push(new Gear(
            v(rand(),rand()),
            randInt(2,15),
            i%2
        ))
    }
    
    global.allGears = gs
    global.allLinks = [new Link(gs[0],gs[1])]
    
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

