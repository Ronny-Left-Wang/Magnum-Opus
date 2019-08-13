class Player {
    constructor(name, size, position) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.target = null;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, 20, 20);
    }

    step() {
        if (this.target) {
            moveTowardTarget();
        }
    }

    moveTowardTarget() {

    }
}

let ronpob;

function setup() {
    let canvas = createCanvas(800, 600);
    ronpob = new Player('ronpob', 20, { x: 10, y: 20 });
}
let x = 0;

function draw() {
    background(51);
    ellipse(x, 0, 100, 100);
    x++;
    ronpob.position.x = mouseX;
    ronpob.position.y = mouseY;
    ronpob.display();
}

