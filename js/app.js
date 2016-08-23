// Height and length of square
var squareHeight = 83;
var squareLength = 101;

// Possible x and y coordinates for the enemies
var xValues = [-squareLength, (-squareLength) * 1.5];
var yValues = [60, 60 + squareHeight, 60 + 2 * squareHeight];

// Character Superclass
var Character = function(url) {
    this.sprite = url;
};

Character.prototype.position = function(x,y) {
    this.x = x;
    this.y = y;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy class
var Enemy = function(x,y,v,url) {  
    Character.call(this,url);
    this.position(x,y);
    this.speed(v); 
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Location and speed of enemies
Enemy.prototype.speed = function(v) {
    this.speed = v; 
};

// Update location and check for collision with player
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt * this.speed;
    if (this.x > squareLength * 6) {
        x = xValues[Math.floor(Math.random() * xValues.length)];
        y = yValues[Math.floor(Math.random() * yValues.length)];
        v = 90 * Math.floor((Math.random() * 5) + 1);
        this.position(x,y);
        this.speed = v;
    }
    if ((Math.abs(this.x - player.x) < 60) && (Math.abs(this.y - player.y) < 20)) {
        alive = false;   
        reset();
    }
};

// Player class
var Player = function(x,y,url) {
    Character.call(this,url);
    this.position(x,y);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
    
// Check if player arrived to goal
Player.prototype.update = function() {
    if (this.y === -10) {
        won = true;
        reset();
    }
};

// Control player with arrow keys
Player.prototype.handleInput = function(key) {
    if (alive === true && won === false) {
        if (key === 'up' && this.y > - 10) {
            this.y = this.y - squareHeight;
        } else if (key === 'down' && this.y < (squareHeight * 5) - 10) {
            this.y = this.y + squareHeight;
        } else if (key === 'left' && this.x > 0) {
            this.x = this.x - squareLength;
        } else if (key === 'right' && this.x < squareLength * 4) {
            this.x = this.x + squareLength;
        }    
    }
};

// Enemy objects 
var allEnemies = [];

for (var i = 0; i < 5; i++) {
    x = xValues[Math.floor(Math.random() * xValues.length)];
    y = yValues[Math.floor(Math.random() * yValues.length)];
    v = 90 * Math.floor((Math.random() * 5) + 1);
    var enemy = new Enemy(x,y,v,'images/enemy-bug.png');  
    allEnemies.push(enemy);
}
    
// Player object
var player = new Player(squareLength * 2,(squareHeight * 5) - 10,'images/char-boy.png');
    
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
