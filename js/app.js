// Height and length of square
var squareHeight = 83;
var squareLength = 101;

// Enemy class
var Enemy = function() {   
    this.sprite = 'images/enemy-bug.png';
    this.newEnemyValues(); 
};

// Location and speed of enemies
Enemy.prototype.newEnemyValues = function() {
    var xValues = [-squareLength, (-squareLength) * 1.5];
    var yValues = [60, 60 + squareHeight, 60 + 2 * squareHeight];

    this.x = xValues[Math.floor(Math.random() * xValues.length)];
    this.y = yValues[Math.floor(Math.random() * yValues.length)];
    this.speed = 90 * Math.floor((Math.random() * 5) + 1); 
};

// Update location and check for collision with player
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt * this.speed;
    if (this.x > squareLength * 6) {
        this.newEnemyValues();
    }
    if ((Math.abs(this.x - player.x) < 60) && (Math.abs(this.y - player.y) < 20)) {
        alive = false;   
        reset();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.newPlayerValues(); 
};

// Initial location of player
Player.prototype.newPlayerValues = function() {
    this.x = squareLength * 2;
    this.y = (squareHeight * 5) - 10;  
};

// Check if player arrived to goal
Player.prototype.update = function() {
    if (this.y == -10) {
        won = true;
        reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control player with arrow keys
Player.prototype.handleInput = function(key) {
    if (alive == true && won == false) {
        if (key == 'up' && this.y > - 10) {
            this.y = this.y - squareHeight;
        } else if (key == 'down' && this.y < (squareHeight * 5) - 10) {
            this.y = this.y + squareHeight;
        } else if (key == 'left' && this.x > 0) {
            this.x = this.x - squareLength;
        } else if (key == 'right' && this.x < squareLength * 4) {
            this.x = this.x + squareLength;
        }    
    }
};

// Enemy objects 
var allEnemies = [];

for (var i = 0; i < 5; i++) {
  var enemy = new Enemy();  
  allEnemies.push(enemy);
}

// Player object
var player = new Player();

// Sens key presses to Player.handleInput() method 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
