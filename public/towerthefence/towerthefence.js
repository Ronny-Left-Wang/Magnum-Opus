class Tower {
    constructor(name, size, position, range, damage, enemies) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.atkSpeed = 2;
        this.range = range;
        this.damage = damage;
        this.enemies = enemies;
    }

    display() {
        fill(60, 25, 200);
        rect(this.position.x, this.position.y, this.size, this.size);
    }

    step() {
        this.showRange();
        this.shootAtEnemy();
    }

    showRange() {
        if (this.enemyInRange()) {
            fill(255, 0, 0, 50);
        } else {
            fill(0, 255, 255, 50);
        }
        rect(this.position.x, this.position.y, this.range, this.range);
    }

    shootAtEnemy() {
        if (this.enemyInRange()) {
            console.log("shooting at: " + this.enemies[0].position.x);
        }
    }

    enemyInRange() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemy = enemies[i];
            if (this.enemy.position.x - this.enemy.size /  2 <= this.position.x + this.range / 2 &&
                this.enemy.position.x + this.enemy.size /  2 >= this.position.x - this.range / 2 &&
                this.enemy.position.y <= this.position.y + this.range / 2 &&
                this.enemy.position.y >= this.position.y - this.range / 2) {
                return true;
            }
        }
        return false;
    }
}

let path;
let enemy;
let enemies = [];
let towers = [];
let maxEnemies = 2;

function setup() {
    createCanvas(800, 600);
    rectMode(CENTER);
    const points = [
        [0, height / 2],
        [100, height / 2],
        [100, 150],
        [350, 150],
        [350, height / 2],
        [width, height / 2]
    ];
    path = new Path(points);
    enemy = new Enemy('peasant', 100, { x: 0, y: height / 2 }, 5, points);
    enemy2 = new Enemy('peasant', 30, { x: 0, y: height / 2 }, 2, points);
    enemies.push(enemy);
    enemies.push(enemy2);
}

function draw() {
    let noUse = [];
    let a = [];
    background(51);

    for (let i = 0; i < towers.length; i++) {
        let tower = towers[i];
        tower.step();
        tower.display();
    }

    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        enemy.step();
        enemy.display();
    }
    path.display();
}

function mousePressed() {
    let tower = new Tower('basic', 40, { x: mouseX, y: mouseY }, 200, 1, enemies);
    towers.push(tower);
}

class Enemy {
    constructor(name, size, position, speed, points) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.velX = speed;
        this.points = points;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    step() {
        this.position.x += this.velX;
        if (this.position.x >= width || this.position.x <= 0) {
            this.velX *= -1;
        }
    }
}

class Bullet {
    constructor(position, direction, enemy) {
        this.position = position;
        this.direction = direction;
        this.enemy = enemy;
        this.speed = 4;
        this.size = 4;
    }

    step() {

    }

    display() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}

class Path {
    constructor(points) {
        this.points = points;
    }

    display() {
        for (let i = 0; i < this.points.length; i++) {
            fill(50, 150, 50);
            ellipse(this.points[i][0], this.points[i][1], 10, 10);
        }
    }
}
