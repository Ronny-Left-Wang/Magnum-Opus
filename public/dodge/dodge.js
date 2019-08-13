const PLAYER_IDLE_COLOR = { r: 0, g: 0, b: 55 };
const PLAYER_MOVE_COLOR = { r: 55, g: 100, b: 50 };

class Enemy {
    constructor() {

    }

}

let ronpob;

function setup() {
    let canvas = createCanvas(800, 600);
    ronpob = new Player('ronpob', 20, { x: 10, y: 20 });
}

function draw() {
    background(51);
    if (mouseIsPressed && mouseX <= width && mouseY <= width && mouseX >= 0 && mouseY >= 0) {
        ronpob.target = { x: mouseX, y: mouseY };
    }
    ronpob.step();
    ronpob.display();
}

function fillColor(colorObject) {
    fill(colorObject.r, colorObject.g, colorObject.b);
}

class Player {
    constructor(name, size, position) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.speed = 5;
        this.target = null;
    }

    display() {
        if (this.target == null) {
            fillColor(PLAYER_IDLE_COLOR);
        } else {
            fillColor(PLAYER_MOVE_COLOR);
        }
        ellipse(this.position.x, this.position.y, 20, 20);
    }

    step() {
        if (this.target) {
            this.moveTowardTarget();
        }
    }

    moveTowardTarget() {
        let tx = this.target.x - this.position.x,
            ty = this.target.y - this.position.y,
            dist = Math.sqrt(tx * tx + ty * ty);

        if (dist == 0) {
            this.target = null;
            return;
        }

        let postPosition = {
            x: this.position.x + (tx / dist) * this.speed,
            y: this.position.y + (ty / dist) * this.speed
        };

        let px = postPosition.x - this.position.x,
            py = postPosition.y - this.position.y;
        let postDist = Math.sqrt(px * px + py * py);

        if (postDist > dist) {
            this.position = this.target;
            this.target = null;
            return;
        } else {
            this.position = postPosition;
        }
    }
}
