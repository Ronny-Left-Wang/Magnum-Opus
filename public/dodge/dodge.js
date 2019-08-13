const PLAYER_IDLE_COLOR = { r: 0, g: 0, b: 55 };
const PLAYER_MOVE_COLOR = { r: 55, g: 100, b: 50 };

let ronpob;
let maLong;
let clapper;
let cannon;
let homingMissile;
let bullets = [];

function setup() {
    let canvas = createCanvas(800, 600);
    ronpob = new Player('ronpob', { x: 20, y: 20 } , { x: 10, y: 20 });
    maLong = new Enemy(50, { x: 50, y: 400 });
    clapper = new ClapperEnemy({ x: 115, y: 35 }, { x: 0, y: height / 2 });
    cannon = new CannonEnemy(20, { x: 10, y: 10 }, ronpob);
    homingMissile = new HomingEnemy({ x: 20, y: 20 }, { x: width / 2, y: height / 2 }, ronpob);
}

function draw() {
    background(51);

    if (mouseIsPressed && inCanvas({ x: mouseX, y: mouseY})) {
        ronpob.target = { x: mouseX, y: mouseY };
    }
    clapper.step();
    ronpob.step();
    cannon.step();
    maLong.step();
    homingMissile.step();
    ronpob.isColliding = false;
    updateBullets();
    if (circleRectCollision(maLong, ronpob)) {
        ronpob.isColliding = true;
    }
    if (rectRectCollision(clapper, ronpob)) {
        ronpob.isColliding = true;
    }
    cannon.display();
    clapper.display();
    maLong.display();
    ronpob.display();
    homingMissile.display();
}

function updateBullets() {
    for (let i = 0; i < bullets.length; ++i) {
        let bullet = bullets[i];
        bullet.step();

        if (!inCanvas({ x: bullet.position.x, y: bullet.position.y })) {
            bullets.splice(i, 1);
            delete(bullet);
            bullet = null;
            --i;
            continue;
        }

        if (circleRectCollision(bullet, ronpob)) {
            ronpob.isColliding = true;
        }
        bullet.display();
    }
}

function rectRectCollision(rectA, rectB) {
    let rect1 = {
        x: rectA.position.x,
        y: rectA.position.y,
        width: rectA.size.x,
        height: rectA.size.y
    }, rect2 = {
        x: rectB.position.x,
        y: rectB.position.y,
        width: rectB.size.x,
        height: rectB.size.y
    };

    return (rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y);
}

function circleRectCollision(circle, rect) {
    let cx = circle.position.x;
    let cy = circle.position.y;
    let rx = rect.position.x;
    let ry = rect.position.y;
    let rh = rect.size.y;
    let rw = rect.size.x;
    let testX = cx;
    let testY = cy;
    let rad = circle.size / 2;

    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge

    let d = dist(cx, cy, testX, testY);

    if (d <= rad) {
        return true;
    }
    return false;
}

function inCanvas(position) {
    return (position.x >= 0 && 
        position.x <= width && 
        position.y >= 0 &&
        position.y <= height);
}

function fillColor(colorObject) {
    fill(colorObject.r, colorObject.g, colorObject.b);
}

class HomingEnemy {
    // bug: sometimes it stops following target and runs off forever in 1 direction (should be reproducible)
    constructor(size, position, target) {
        this.size = size;
        this.position = position;
        this.angle = 0;
        this.speed = 3;
        this.rotationalSpeed = 3;
        this.target = target;
    }

    step() {
        this.move();
    }

    move() {
        this.angleTowardsPlayer();
        this.position.x += Math.cos(this.angle) * this.speed;
        this.position.y += Math.sin(this.angle) * this.speed;
    }

    angleTowardsPlayer() {
        let tx = this.target.position.x - this.position.x,
            ty = this.target.position.y - this.position.y,
            dist = Math.sqrt(tx * tx + ty * ty),
            angle = Math.atan2(ty / dist, tx / dist);

        if (Math.abs(2 * Math.PI + angle - this.angle) % (2 * Math.PI) > Math.PI) {
            this.angle -= this.rotationalSpeed / 100;
        } else {
            this.angle += this.rotationalSpeed / 100;
        }

    }

    display() {
        let nippleSize = {
            x: .2 * this.size.x,
            y: .2 * this.size.x,
        };
        fill(255, 255, 0);
        ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
        fill(0);
        let xOffset = this.size.x / 2 - nippleSize.x;
        ellipse(this.position.x + Math.cos(this.angle) * xOffset, this.position.y + Math.sin(this.angle) * xOffset,
            nippleSize.x, nippleSize.y);
    }

}

class Enemy {
    constructor(size, position) {
        this.size = size;
        this.position = position;
        this.speed = 4;
        this.velX = this.speed;
        this.velY = this.speed;
    }

    display() {
        fill(0, 155, 200);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    step() {
        this.move();
    }

    move() {
        this.position.x += this.velX;
        this.position.y += this.velY;
        if (this.position.x + this.size / 2 > width || this.position.x - this.size / 2 < 0) {
            this.velX *= -1;
        }
        if (this.position.y + this.size / 2 > height || this.position.y - this.size / 2 < 0) {
            this.velY *= -1;
        }
    }
}

class ClapperEnemy {
    constructor(baseSize, position) {
        this.baseSize = baseSize;
        this.size = {
            x: baseSize.x,
            y: baseSize.y
        }
        this.position = position;
        this.speed = 5;
    }

    step() {
        this.clap();
    }

    clap() {
        this.size.x += this.speed;
        if (this.position.x + this.size.x > width) this.speed *= -1;
        if (this.size.x - this.baseSize.x < 0) this.speed *= -1;
    }

    display() {
        fill(55, 10, 15);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Bullet {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
        this.size = 4;
    }

    step() {
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

    display() {
        fill(0, 255, 0);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}

class CannonEnemy {
    constructor(size, position, target) {
        this.size = size;
        this.position = position;
        this.target = target;
        this.speed = 5;
        this.t = 0;
        this.cooldown = 60;
        this.nextShot = this.cooldown;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, 30, 30);
    }

    step() {
        this.t += 1;
        if (this.target && this.t >= this.nextShot) {
            let direction = {
                x: this.target.position.x - this.position.x,
                y: this.target.position.y - this.position.y
            };
            let dist = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            let normalizedDirection = {
                x: direction.x / dist,
                y: direction.y / dist
            };
            let bullet = new Bullet({ x: this.position.x, y: this.position.y }, normalizedDirection);
            bullets.push(bullet);
            this.nextShot += this.cooldown;
        }
    }

}


class Player {
    constructor(name, size, position) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.speed = 10;
        this.target = null;
    }

    display() {
        if (this.target == null) {
            fillColor(PLAYER_IDLE_COLOR);
        } else {
            fillColor(PLAYER_MOVE_COLOR);
        }
        if (this.isColliding) {
            fill(255, 0, 0);
        }
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
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
