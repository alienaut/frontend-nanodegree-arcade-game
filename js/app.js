var SLOW_ENEMY_SPEED = 100,
    FAST_ENEMY_SPEED = 150,
    VERY_FAST_ENEMY_SPEED = 300,
    CANVAS_WIDTH = 505,
    CELL_WIDTH = 101,
    ENEMY_LEFT_BOUNDARY = -200,
    ENEMY_RIGHT_BOUNDARY = CANVAS_WIDTH + 200,
    CELL_HEIGHT_PADDING = 20,
    CELL_HEIGHT = 83;

// Ancestor class for enemies and player.
var Creature = function(sprite) {
    this.sprite = sprite;
};

// Draw a creature on the screen, required method for game
Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(row, speed, sprite) {
    Creature.call(this, 'images/enemy-bug.png');
    this.speed = {
        'slow': SLOW_ENEMY_SPEED,
        'fast': FAST_ENEMY_SPEED,
        'very-fast': VERY_FAST_ENEMY_SPEED
    }[speed];
    this.row = row;
    this.x = Math.random() * (ENEMY_RIGHT_BOUNDARY - ENEMY_LEFT_BOUNDARY) + ENEMY_LEFT_BOUNDARY;
    this.y = row * CELL_HEIGHT - CELL_HEIGHT_PADDING;
};

Enemy.prototype = Object.create(Creature.prototype);
Enemy.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x < ENEMY_RIGHT_BOUNDARY ? this.x + this.speed * (dt) : ENEMY_LEFT_BOUNDARY;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite) {
    Creature.call(this, sprite);
    this.col = 2;
    this.row = 4;
    this.keysCount = 0;
};

Player.prototype = Object.create(Creature.prototype);
Player.constructor = Player;

Player.prototype.update = function() {
    this.x = this.col * CELL_WIDTH;
    this.y = this.row * CELL_HEIGHT - CELL_HEIGHT_PADDING;
};

Player.prototype.handleInput = function(key) {
    // checks for boundaries first, if player won't overpass
    // change location and update otherwise exit from method.
    switch (key) {
        case 'up':
            if (this.row > 0) {
                this.row--;
            } else {
                return;
            }
            break;
        case 'down':
            if (this.row < 5) {
                this.row++;
            } else {
                return;
            }
            break;
        case 'left':
            if (this.col > 0) {
                this.col--;
            } else {
                return;
            }
            break;
        case 'right':
            if (this.col < 4) {
                this.col++;
            } else {
                return;
            }
            break;
    }
};

Player.prototype.reset = function() {
    this.col = 2;
    this.row = 4;
};

Player.prototype.takePrize = function() {
    this.prizeCount++;
};

Player.prototype.giveAllPrizes = function() {
    this.prizeCount = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(1, 'slow'),
    new Enemy(2, 'fast'),
    new Enemy(2, 'very-fast'),
    new Enemy(3, 'very-fast')
];

var player = new Player('images/char-boy.png');


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
