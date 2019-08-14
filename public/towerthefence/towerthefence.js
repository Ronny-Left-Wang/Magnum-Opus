class Tower {
    constructor(name, size, position, atkSpeed, range) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.atkSpeed = 2;
        this.range = 70;
    }

    display() {
        rect(this.position.x, this.position.y, this.size, this.size);
    }
}

class Path {
    constructor(points) {
        this.points = points;
    }

    display() {
        for (let i = 0; i < this.points.length; i++) {
            ellipse(this.points[i][0], this.points[i][1], 10, 10);
        }
    }
}

class Enemy {
    constructor(name, size, position, speed, points) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.speed = speed;
        this.points = points;
    }

    display() {
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    step() {
        // if position is reached, move to next position in the array
        this.position.x += 1;
    }
}

let path;
let enemy;
let towers = [];
let towerExists = false;

function setup() {
    createCanvas(800, 600);
    const points = [
        [0, height / 2],
        [100, height / 2],
        [100, 150],
        [350, 150],
        [350, height / 2],
        [width, height / 2]
    ];
    path = new Path(points);
    enemy = new Enemy('peasant', 30, { x: 0, y: height / 2 }, 5, points);
}

function draw() {
    background(51);

    if (towerExists) {
        for (let i = 0; i < towers.length; i++) {
            let tower = towers[i];
            tower.display();
        }
    }
    path.display();
    enemy.step();
    enemy.display();
}

function mousePressed() {
    let tower = new Tower('basic', 40, { x: mouseX, y: mouseY }, 1, 200);
    towers.push(tower);
    towerExists = true;
}
