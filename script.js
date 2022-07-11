let defaultColor = 'yellow';
let highlightColor = 'magenta';
let sketchColor = 'cyan';
let eraser = false;

const densityButton = document.querySelector('#densityButton');

densityButton.addEventListener('click', densitySet);

const eraserButton = document.querySelector('#eraserButton');

eraserButton.addEventListener('click', () => {
    if (eraser) {
        sketchColor = 'cyan';
        eraser = false;
        eraserButton.textContent = 'Activate eraser'
    }
    else {
        eraser = true;
        sketchColor = 'yellow';
        eraserButton.textContent = "Deactivate eraser"
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
    const grid = document.querySelector('#grid')
    grid.textContent = '';
    grid.style['grid-template-columns'] = `repeat(${density}, 1fr)`;
    grid.style['grid-template-rows'] = `repeat(${density}, 1fr)`;
    grid.style['background-color'] = 'yellow';
    for (let i=0; i<density**2; i++) {
        const cells = document.createElement('div');
        cells.classList.add('cells');
        grid.appendChild(cells);
    }
    const cells = document.querySelectorAll('.cells');
    cells.forEach(i => i.addEventListener('mouseenter', enteringCell));
    cells.forEach(i => i.addEventListener('mouseleave', leavingCell));
    cells.forEach(i => i.addEventListener('click', clickingCell));
}

function enteringCell() {
    if (!(this.style['background-color'] == sketchColor) && !pressing) {
        this.style['background-color'] = highlightColor;
    }
    else {
        this.style['background-color'] = sketchColor;
        this.classList.add('colored')
    }
}

function leavingCell() {
    if (!(this.classList.contains('colored'))) {
        this.style['background-color'] = defaultColor;
    }
    else if (this.classList.contains('colored')) {
        this.style['background-color'] = sketchColor;
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