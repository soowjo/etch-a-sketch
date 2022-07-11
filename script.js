const grid = document.querySelector('#grid')
let defaultColor = 'yellow'
let highlightColor = 'magenta'
let sketchColor = 'cyan'
let eraser = false;

const densityButton = document.querySelector('#densityButton');

densityButton.addEventListener('click', densitySet);

const eraserButton = document.querySelector('#eraserButton');

eraserButton.addEventListener('click', () => {
    if (eraser) {
        sketchColor = 
        eraser = false;
    }
    else {
        eraser = true;

    }
})

function densitySet() {
    do {
        density = prompt('Enter the number of squares per side between 1 and 100');
        if (density == null) {
            return;
        }
    } while (!(density >=1 && density <= 100))
    makeGrid(density);
}

function makeGrid(density) {
    grid.textContent = '';
    grid.style['grid-template-columns'] = `repeat(${density}, 1fr)`
    grid.style['grid-template-rows'] = `repeat(${density}, 1fr)`
    for (let i=0; i<density**2; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
    cell.forEach(i => i.addEventListener('mouseenter', enteringCell));
    cell.forEach(i => i.addEventListener('mouseleave', leavingCell));
    cell.forEach(i => i.addEventListener('click', clickingCell));
}

function enteringCell() {
    if (!(this.style['background-color'] == sketchColor) && !pressing) {
        this.style['background-color'] = highlightColor;
    }
    else {
        this.style['background-color'] = sketchColor;
    }
}

function leavingCell() {
    if (!(this.style['background-color'] == sketchColor)) {
        this.style['background-color'] = defaultColor;
    }
}

function clickingCell () {
    this.style['background-color'] = sketchColor;
}

let pressing = false;
document.body.onmousedown = () => (pressing = true);
document.body.onmouseup = () => (pressing = false);

// const size = document.querySelector('#string')

const div = document.querySelectorAll('div')
div.forEach(i => i.addEventListener('dragstart', (e) => {
  e.preventDefault()
}))

div.forEach(i => i.addEventListener('drop', (e) => {
  e.preventDefault()
}))