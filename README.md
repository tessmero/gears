
Randomized spinning gears automatically align to form a chain.

Click to spawn a new gear and shuffle the chain

Special simplified physics engine:
- Each gear is treated as a single particle with a fixed orientation
- One global oscillating number creates the effect of angular momentum
- Precise interlocking effect by occasionally nudging the gears' orientations
- Nudges always applied in opposite equal pairs for realistic transfer along chain



## Demo

https://tessmero.github.io/gears.html

## Usage

clone this repository to your computer

open `test.html` to test locally, using source files in `src`

run `python build.py` to concatenate all source files into one distributable file: `production.js`

