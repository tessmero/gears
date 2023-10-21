const global = {
    // graphics context
    canvas: null,
    ctx: null,
    
    // relate pixels to virtual units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //internal units

    // 
    backgroundColor: 'black',
    lineColor: 'white',
    lineWidth: .001,
      
    // state
    t: 0, // total time elapsed
    allGears: [], // Gear instances
    allLinks: [], // Link instances
    animPeriod: 100000,
    animState: 0, // [0-1] oscilates over animPeriod
    animScale: 50, // interger temporal scale, number of teeth
    
    //
    toothTaper: .06, // how much to taper each tooth (radians)
    toothWidth: .015, 
    
    //
    friction: 1e-2, // fraction of speed lost per ms
    allignForce: 1e-6, // scale of accel to position gears
    
    // move automatically if no user input
    autoMoveCountdown: 0,
    autoMoveDelay: 1000,
    
    //debug
    debugPoints: [],
    debugMouse: false,
}