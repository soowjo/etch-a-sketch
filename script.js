// set default parameters

let defaultColor = 'yellow';
let highlightColor = 'magenta';
let sketchColor = 'cyan';
let eraser = false;

// get button elements

const densityButton = document.querySelector('#densityButton');

densityButton.addEventListener('click', densitySet);

const eraserButton = document.querySelector('#eraserButton');

eraserButton.addEventListener('click', () => {
    if (eraser) {
        eraser = false;
        eraserButton.textContent = 'Activate eraser'
    }
    else {
        eraser = true;
        eraserButton.textContent = "Deactivate eraser"
    }
})

// define the grid density

function densitySet() {
    do {
        density = prompt('Enter the number of squares per side between 1 and 100');
        if (density == null) {
            return;
        }
    } while (!(density >=1 && density <= 100))
    makeGrid(density);
}

// grid generation function

function makeGrid(density) {
    const grid = document.querySelector('#grid')
    grid.textContent = '';
    grid.style['grid-template-columns'] = `repeat(${density}, 1fr)`;
    grid.style['grid-template-rows'] = `repeat(${density}, 1fr)`;
    grid.style['background-color'] = 'yellow';
    for (let i=0; i<density**2; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cells');
        cell.style['background-color'] = defaultColor;
        grid.appendChild(cell);
    }
    const cells = document.querySelectorAll('.cells');
    cells.forEach(i => i.addEventListener('mouseenter', enteringCell));
    cells.forEach(i => i.addEventListener('mouseleave', leavingCell));
    cells.forEach(i => i.addEventListener('click', clickingCell));
}

// changing the cell color when hovering

function enteringCell() {
    if (!eraser) {
        if (!(this.classList.contains('colored')) && !pressing) {
            this.style['background-color'] = highlightColor;
        }
        else {
            this.style['background-color'] = sketchColor;
            this.classList.add('colored')
        }
    }
    else {
        if (this.classList.contains('colored') && !pressing) {
            this.style['background-color'] = highlightColor;
        }
        else {
            this.style['background-color'] = defaultColor;
            this.classList.remove('colored')
        }
    }
}

// dehighlighting cell when mouse moves away

function leavingCell() {
    if (!(this.classList.contains('colored'))) {
        this.style['background-color'] = defaultColor;
    }
    else {
        this.style['background-color'] = sketchColor;
    }    
}

// changing the cell color when clicking

function clickingCell () {
    if (!eraser) {
        this.style['background-color'] = sketchColor;
        this.classList.add('colored')
    }
    else {
        this.style['background-color'] = defaultColor;
        this.classList.remove('colored')
    }
}

// additional inputs to allow coloring by dragging

let pressing = false;
grid.onmousedown = () => (pressing = true);
grid.onmouseup = () => (pressing = false);

// inputs to prevent erratic dragging behavior

const div = document.querySelectorAll('div')
div.forEach(i => i.addEventListener('dragstart', (e) => {
  e.preventDefault()
}))

div.forEach(i => i.addEventListener('drop', (e) => {
  e.preventDefault()
}))