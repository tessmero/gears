
Randomized spinning gears automatically align to form a chain.

Click to spawn a new gear, reload to randomize

Each gear is treated as a single particles with NO angular velocity. Instead one oscillatting global variable creates the effect of momentum and each gear just has a fixed angular offset. Neighboring gears' angular offsets are occasionally nudged for convincing interlocking effect.



## Demo

https://tessmero.github.io/gears.html

## Usage

clone this repository to your computer

open `test.html` to test locally, using source files in `src`

run `python build.py` to concatenate all source files into one distributable file: `production.js`

