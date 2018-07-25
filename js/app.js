// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //adding the step property
    this.step = 101;
    //adding speed property
    this.speed = speed;
    //defining restar position for the bug
    //so it walks out and in the board the same way
    this.restartPos = -this.step;
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.step*5){
        this.x += this.speed*dt;
    } else {
        this.x = this.restartPos;
    }
    };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor (){
        this.sprite='images/char-boy.png';
        //defining step and jump properties
        this.step = 101;
        this.jump = 83;
        //defining startX and startY properties to make sure 
        //the player is at the buttom of the board
        this.startX = this.step*2;
        this.startY = this.jump*4 + 50;
        this.x = this.startX;
        this.y = this.startY;
      
    }
    update() {
            for (let enemy of allEnemies){
            //check the collision condition
            if(this.y === enemy.y && (this.x < enemy.x + enemy.step/3 && enemy.x < this.x + this.step/3)){
           //if anemy and the player collide, the player is set to to the starting position
               this.reset();
            }
            console.log(this.y,enemy.y);
            }
            //check for win
            if (this.y === -33){
                setTimeout(()=>{
                    this.reset();
                },8);
                 setTimeout(()=>{
                    alert('You win');
                },12);
            }
                console.log(player.y);
        }; 
   
    //drawing a Hero on the screen using drawImage method provided in the starter code 

    render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
        switch (input) {
        // Set boundaries for player movement
            case 'left':
            if(this.x > 0){
                this.x -= this.step;
            };
                break;
            case 'up':
            if(this.y > 0) {
                this.y -= this.jump;
            };
                break;
            case 'right':
            if(this.x < this.step*4){
                this.x += this.step;
            };
                break;
            case 'down':
            if(this.y < this.jump*4){
                this.y += this.jump;
            };
                break;
                }
    };
        reset() {
            this.x = this.startX;
            this.y = this.startY;
        }
    };
    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const firstBug = new Enemy(-101, 0, 200);
const secondBug = new Enemy(-101, 83, 300);
const thirdBug = new Enemy((-101*2.5), 83, 100);
const fourthBug = new Enemy(-101, 166,150);
const allEnemies = [];
allEnemies.push(firstBug,secondBug,thirdBug,fourthBug);
console.log(allEnemies);


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

