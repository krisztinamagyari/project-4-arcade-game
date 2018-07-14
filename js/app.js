//----------------------ENEMY------------------------

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.speed = getRandomInt(75, 250);
    this.sprite = 'images/enemy-bug.png';
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -50;
        this.speed = getRandomInt(75, 250);
    };

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Source of collision check: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    var rect1 = {x: this.x, y: this.y, width: this.width, height: this.height};
    var rect2 = {x: player.x, y: player.y, width: player.width, height: player.height};

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
  // collision detected!
    player.x = 202;
    player.y = 405;
    allLives.pop();
}
};

//----------------------PLAYER------------------------
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.player = 'images/char-pink-girl.png';
}

Player.prototype.update = function (dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (keyPress == 'right' && this.x < 400) {
        this.x += 101;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }

    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 600);
    }
};

//----------------------HEARTS / LIVES ------------------------
var Life = function (x, y) {
    this.x = x;
    this.y = y;
    this.life = 'images/Heart.png';
}

Life.prototype.update = function (dt) {
};

Life.prototype.render = function() {
      ctx.drawImage(Resources.get(this.life), this.x, this.y, 40, 55);
};

var Lifescore = function() {
};

Lifescore.prototype.render = function () {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Lives: ", 260, 575);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyLocation = [63, 150, 227];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(-100, locationY)
    allEnemies.push(enemy);
});

var player = new Player(202, 405);

var allLives = [];
var lifeLocation = [360, 410, 460];

lifeLocation.forEach(function (locationX) {
    life = new Life(locationX, 535)
    allLives.push(life);
});

var lifescore = new Lifescore;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
