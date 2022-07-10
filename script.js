const grid = document.querySelector('#grid')

makeGrid(16);

function makeGrid (size) {
    grid.style['grid-template-columns'] = `repeat(${size}, 1fr)`
    grid.style['grid-template-rows'] = `repeat(${size}, 1fr)`
    for (let i=0; i<size**2; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell;
    }
}


// const size = document.querySelector('#string')

