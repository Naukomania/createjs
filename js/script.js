var KEYCODE_SPACE	= 32;
var KEYCODE_LEFT	= 37;
var KEYCODE_RIGHT	= 39;

var jumpSpeed = 1000;
var xVel = 5;
var yVel = 0;
var gravity = 1.2;
var isJumping = false;
var moveLeft = false;
var moveRight = false;
var characterMoving = true;
var characterHeight = 64;
var characterWidth = 64;
var characterGround = 100;

var stage;
var character;
function init() {
  var canvas = document.getElementById("testCanvas");
	stage = new createjs.Stage(canvas);

	// Создаём надпись
	var shape = new createjs.Text("Hello World", "20px Arial", "#ff7700");
	shape.x = 100;
	shape.scaleX = 5;
	shape.scaleY = 5;
	stage.addChild(shape);

	// Создаём картинку с коробкой
	var image = new createjs.Bitmap("images/box.jpg");
	image.scaleX = image.scaleY = 0.1;
	image.x = 100;
	image.y = 100;
	image.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	stage.addChild(image);

	// Спрайт анимация
	var data = new createjs.SpriteSheet({
		"images": ["images/boy.png"],
		"frames": {"regX": 0, "regY": 0, "height": 64, "count": 7, "width": 64},
		"animations": {
			"run": [0, 7],
			// "jump_right": [8, 12],
			// "walk_left": [16, 23],
			// "jump_left": [24, 28]
		}
	});
	character = new createjs.Sprite(data, "walk_right");
	character.gotoAndStop(0);
	character.x = 100;
	character.y = 100;
	stage.addChild(character);

	createjs.Ticker.addEventListener("tick", handleTick);
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
}

function handleTick(event) {
	if (moveLeft) {
	    character.x -= xVel;
	    if (character.scaleX > 0) {
	        character.scaleX *= -1;
	        character.x += characterWidth;
	    }
	 }else if (moveRight) {
	    character.x += xVel;
	    if (character.scaleX < 0) {
	        character.scaleX *= -1;
	        character.x -= characterWidth;
	    }
    }
	if (isJumping) {
	    yVel += gravity;
	    character.y += yVel;
	    
	    if (character.y > characterGround) {
	        character.y = characterGround;
	        yVel = 0;
	        isJumping = false;
	    } 
	}
	stage.update();
}

function jump() {
    if (isJumping == false) {
        yVel = -15;
        isJumping = true;
    }
}

// привязка к событиям мыши
function handleKeyDown(e) {
switch (e.keyCode) {
    case KEYCODE_SPACE:
    case 87:  // W
        jump();
        break;
    case KEYCODE_LEFT:
    case 65:  // A
        moveLeft = true;
       character.play();
        break;
    case KEYCODE_RIGHT:
    case 68:  // D
        moveRight = true;
       character.play();
        break;
}
 
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = false;
            character.gotoAndStop(0);
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = false;
            character.gotoAndStop(0);
            break;
            
    }
}