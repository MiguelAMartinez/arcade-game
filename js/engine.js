// Start the game alive
var alive = true;
var won = false;
var start = true;

var Engine = (function(global) {

    // Define canvas element and scope variables
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    // Kickoff game loop
    function main() {

        // Get our time delta information 
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Call our update/render functions and pass along the time delta
        update(dt);
        render();

        // Set our lastTime variable which is used to determine the time delta
        // for the next time this function is called
        lastTime = now;

        // Use the browser's requestAnimationFrame function to call this
        // function again as soon as the browser is able to draw another frame.
        win.requestAnimationFrame(main);
    }

    // Initial setup and select lasTime variable for game loop
    function init() {
        lastTime = Date.now();
        main();            
    }

    // This function is called by main (our game loop) and itself calls all
    // of the functions which may need to update entity's data
    function update(dt) {
        updateEntities(dt);
    }

    // This function calls the update() methods of the
    // objects within your allEnemies array and the player object
    function updateEntities(dt) {
        if (won === false && alive === true && start === false) {       
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            player.update();
        }
    }

     // This function is called in every loop of the game engine, and it will then 
     // call the renderEntities function
    function render() {
        // Array of the relative image URL for that particular row 
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Loop through the number of rows and columns we've defined above and, 
        // using the rowImages array, draw the correct image for that portion
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    // Display the game when you are playing or a message when you are not
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();  

        if (alive === false) {
            ctx.drawImage(Resources.get('images/gameover.svg'), 50, 150);        
        }       
        if (won === true) {
            ctx.drawImage(Resources.get('images/won.svg'), 50, 150);           
        }
        if (start === true) {
            ctx.drawImage(Resources.get('images/start.svg'), 50, 150);           
        }
    }
    
    // Use space key to play again 
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            32: 'spacebar'
        };
        if (alive === false || won === true || start === true) {
            newGame(allowedKeys[e.keyCode]); 
        }
    });

    // Start a new game
    var newGame = function(key) {
        if (key === 'spacebar') {
            allEnemies.forEach(function(enemy) {
                x = xValues[Math.floor(Math.random() * xValues.length)];
                y = yValues[Math.floor(Math.random() * yValues.length)];
                v = 90 * Math.floor((Math.random() * 5) + 1);
                enemy.position(x,y);
                enemy.speed = v;
            });

            player.position(squareLength * 2,(squareHeight * 5) - 10);

            if (alive === false) {
                alive = true;            
            } 
            if (won === true) {
                won = false;
            }
            if (start === true) {
                start = false;
            }
        }
    };

    // When all of these images are properly loaded, our game will start
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png', 
        'images/gameover.svg',
        'images/won.svg',
        'images/start.svg'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);



