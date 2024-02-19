/*

The Game Project Part 4 - Side Scrolling

*/

var jumpSound;
var loseSound;
var winSound;
var coinSound;
var musicTrack;

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var isSprinting;

var canyon;
var clouds;
var mountains;
var collectables;
var canyons;

var isJumping;
var v_speed;
var isFallingIntoCanyon;

var trees_x;
var treePos_y;

var cameraPosX;

var game_score;

var flagpole;

var lives;

var isInCanyon;

var isDead;

function preload()
{
	soundFormats('mp3', 'wav');

	// load sounds here
	jumpSound = loadSound('assets/jump.wav');
	jumpSound.setVolume(0.1);

	loseSound = loadSound('assets/lose.mp3');
	loseSound.setVolume(0.1);
	
	winSound = loadSound('assets/win.mp3');
	winSound.setVolume(0.1);

	coinSound = loadSound('assets/coin.mp3');
	coinSound.setVolume(0.1);

	musicTrack = loudSound('assets/music.mp3');
	musicTrack.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;

	lives = 3;

	startGame();
}

function draw()
{
	if (!isFallingIntoCanyon)
    {
        cameraPosX = gameChar_x - width / 2;
    }

	///////////DRAWING CODE//////////

	// fill the sky blue
	background(100,155,255); 

	// draw some green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);

	// beginning of side-scrolling 
	push();
	translate(-cameraPosX, 0);

	// shift to sprint
	// fill(255, 0, 0); 
	// let s = 'Hint: press left-shift to sprint.';
	// textAlign(CENTER);
	// textSize(17);
	// fill(0);
	// text(s, cameraPosX + width/2 - 200, 20, 230, 60);
	// fill(255)
	// text(s, cameraPosX + width/2 - 201, 19, 230, 60);
	

	// insert mountains
	drawMountains();

	// draw the trees
	drawTrees();

	// insert clouds
	drawClouds();

	// draws 3 collectables
	for (var i = 0; i < collectables.length; i++)
	{
		// insert collectable
		drawCollectable(collectables[i]);

		// check for collectable collection
		checkCollectable(collectables[i]);
	}

	// draws 3 canyons
	for (var i = 0; i < canyons.length; i++)
	{
		// insert canyon
		drawCanyon(canyons[i]);

		// fall down canyon
		checkCanyon(canyons[i]);
	}

	// checks whether the player is dead
	checkPlayerDie();

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 45, 24, 39);
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 50, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x - 7, gameChar_y - 54, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 63, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 63, gameChar_x, gameChar_y - 70, gameChar_x + 12, gameChar_y - 63);
		//beard
		fill(200);
		rect(gameChar_x - 15, gameChar_y - 46, 15, 8);
		triangle(gameChar_x - 15, gameChar_y - 38, gameChar_x - 1, gameChar_y - 30, gameChar_x - 1, gameChar_y - 38);
		//mouth
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 42, 6, 2)

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 50, 24, 39)
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 55, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x + 7, gameChar_y - 59, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 68, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 68, gameChar_x, gameChar_y - 75, gameChar_x + 12, gameChar_y - 68);
		//beard
		fill(200);
		rect(gameChar_x, gameChar_y - 51, 15, 8);
		triangle(gameChar_x + 15, gameChar_y - 43, gameChar_x + 1, gameChar_y - 35, gameChar_x + 1, gameChar_y - 43);
		//mouth
		fill(0);
		rect(gameChar_x + 8, gameChar_y - 47, 6, 2)

	}
	else if(isLeft)
	{
		// add your walking left code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 45, 24, 48)
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 50, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x - 7, gameChar_y - 54, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 63, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 63, gameChar_x, gameChar_y - 70, gameChar_x + 12, gameChar_y - 63);
		//beard
		fill(200);
		rect(gameChar_x - 15, gameChar_y - 46, 15, 8);
		triangle(gameChar_x - 15, gameChar_y - 38, gameChar_x - 1, gameChar_y - 30, gameChar_x - 1, gameChar_y - 38);
		//mouth
		fill(0);
		rect(gameChar_x - 15, gameChar_y - 42, 6, 2)

	}
	else if(isRight)
	{
		// add your walking right code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 45, 24, 48)
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 50, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x + 7, gameChar_y - 54, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 63, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 63, gameChar_x, gameChar_y - 70, gameChar_x + 12, gameChar_y - 63);
		//beard
		fill(200);
		rect(gameChar_x, gameChar_y - 46, 15, 8);
		triangle(gameChar_x + 15, gameChar_y - 38, gameChar_x + 1, gameChar_y - 30, gameChar_x + 1, gameChar_y - 38);
		//mouth
		fill(0);
		rect(gameChar_x + 8, gameChar_y - 42, 6, 2);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 50, 24, 39)
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 55, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x - 7, gameChar_y - 59, 5, 5);
		ellipse(gameChar_x + 7, gameChar_y - 59, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 68, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 68, gameChar_x, gameChar_y - 75, gameChar_x + 12, gameChar_y - 68);
		//beard
		fill(200);
		rect(gameChar_x - 15, gameChar_y - 51, 30, 8);
		triangle(gameChar_x - 15, gameChar_y - 43, gameChar_x, gameChar_y - 35, gameChar_x + 15, gameChar_y - 43);
		//mouth
		fill(0);
		rect(gameChar_x - 5, gameChar_y - 47, 10, 2)

	}
	else
	{
		// add your standing front facing code
		//body
		fill(139,69,19);
		rect(gameChar_x - 12, gameChar_y - 45, 24, 48)
		// face
		fill(255,182,193);
		ellipse(gameChar_x, gameChar_y - 50, 30, 30);
		// eyes
		fill(0);
		ellipse(gameChar_x - 7, gameChar_y - 54, 5, 5);
		ellipse(gameChar_x + 7, gameChar_y - 54, 5, 5);
		//hat
		fill(139,69,19);
		rect(gameChar_x - 20, gameChar_y - 63, 40, 5);
		triangle(gameChar_x - 12, gameChar_y - 63, gameChar_x, gameChar_y - 70, gameChar_x + 12, gameChar_y - 63);
		//beard
		fill(200);
		rect(gameChar_x - 15, gameChar_y - 46, 30, 8);
		triangle(gameChar_x - 15, gameChar_y - 38, gameChar_x, gameChar_y - 30, gameChar_x + 15, gameChar_y - 38);
		//mouth
		fill(0);
		rect(gameChar_x - 5, gameChar_y - 42, 10, 2)

	}

	renderFlagpole();

	if (lives == 0){
		fill(255, 0, 0); 
		rect(cameraPosX + width/2 - 85, height/2, 170, 70); 

		let s = 'Game over. Press space to reset.';
		fill(255);
		textAlign(CENTER);
		textSize(17);
		text(s, cameraPosX + width/2 - 75, height/2 + 15, 150, 60);
		return;
	}

	if (flagpole.isReached){
		fill(255, 0, 0); 
		rect(cameraPosX + width/2 - 85, height/2, 170, 85); 

		let s = 'Level complete. Press space to continue.';
		fill(255);
		textAlign(CENTER);
		textSize(17);
		text(s, cameraPosX + width/2 - 75, height/2 + 15, 150, 60);
		return;
	}

	pop();

	// reset button after character has run out of lives
	

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

	// move left without going too far
	if (isLeft == true && gameChar_x > 5) {
			gameChar_x -= 3;
		if (isSprinting == true){
			gameChar_x -= 4;
		}
	}

	// move right without going too far
	if (isRight == true && gameChar_x < width + 300){
		gameChar_x += 3;
		if (isSprinting == true){
			gameChar_x += 4;
		}
	}

	// makes character jump naturally by incrementing speed
	if (isJumping == true){
		gameChar_y += v_speed;
		isFalling = true;
		v_speed += 1;
	} 

// stops character falling through the floor after jumping
	if (gameChar_y == floorPos_y) {
		v_speed = 0;
		isFalling = false;
		isJumping = false;
	}

	// adds the score to the top left
	fill(0);
	rect(20, 10, 66, 32);

	fill(255);
	noStroke;
	text("Score: " + game_score, 30, 30);

	// adds the lives to the top left
	fill(0);
	rect(90, 10, 140, 32);

	fill(255);
	noStroke;
	text("Lives: ", 103, 30);

	for (var i = 0; i < lives; i++)
	{
		fill(255);
		rect(140 + i * 30, 16, 20, 20);
	}

	if (flagpole.isReached == false)
	{
		checkFlagpole();
	}

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	// detect input for character movement
	if (keyCode == 37){
		console.log("left arrow");
		isLeft = true;
	}
	else if (keyCode == 39){
		console.log("right arrow");
		isRight = true;
	}
	else if (keyCode == 38 && !isFalling && !isJumping){
		console.log("up arrow");
		v_speed = -15;
		isJumping = true;
		jumpSound.play();
	}

	if (keyCode == 16){
		isSprinting = true;
	}

	if (keyCode == 32){
		if (lives == 0 || flagpole.isReached == true){
				location.reload();
				game_score = 0;
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	// stops character moving after key is released
	if (keyCode == 37){
		console.log("left arrow");
		isLeft = false;
	}
	else if (keyCode == 39){
		console.log("right arrow");
		isRight = false;
	}

	if (keyCode == 16){
		isSprinting = false;
	}
} 

function drawClouds()
{
	for(var i = 0; i < clouds.x_pos.length; i++)
	{
		fill(255,255,255);
		ellipse(clouds.x_pos[i] + 13,clouds.y_pos[i],clouds.size[i]+30,clouds.size[i]+10);
		ellipse(clouds.x_pos[i] - 15,clouds.y_pos[i] + 15,clouds.size[i]+20,clouds.size[i]);
		ellipse(clouds.x_pos[i] + 41,clouds.y_pos[i] + 15,clouds.size[i]+20,clouds.size[i]);
	}
}

function drawMountains()
{
	for(var i = 0; i < mountains.length; i++)
	{
		fill(80,80,80);
		triangle(mountains[i].x_pos + 150, mountains[i].y_pos, mountains[i].x_pos + 350 + mountains[i].size*2, mountains[i].y_pos, mountains[i].x_pos + 250 + mountains[i].size,200 - mountains[i].size);
	}
}

function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
	{
		fill(150,75,0);
		rect(trees_x[i],treePos_y - 150,60,150);
		// leaves
		fill(0,140,0);
		ellipse(trees_x[i] + 30, treePos_y - 174, 90, 80);
		ellipse(trees_x[i],treePos_y - 144,90,80);
		ellipse(trees_x[i] + 60, treePos_y - 144, 90, 80);
	}
}

function drawCollectable(t_collectable)
{

	if (t_collectable.isFound == false)
	{
		fill(255,215,0);
		ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size - 20, t_collectable.size - 20);

		fill(179,180,0);
		ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size - 30,t_collectable.size - 30);
	}
}

function drawCanyon(t_canyon)
{
	fill(74, 4, 4);
	rect(t_canyon.x_pos,432,t_canyon.width,200);

	fill(150,75,0)
	triangle(t_canyon.x_pos,576,t_canyon.x_pos,450,t_canyon.x_pos + 10,500);
	rect(t_canyon.x_pos - 5,432,10,200);
	triangle(t_canyon.x_pos + t_canyon.width,576,t_canyon.x_pos + t_canyon.width,500,t_canyon.x_pos + t_canyon.width - 20,490);
	rect(t_canyon.x_pos + t_canyon.width,432,10,200);
}

function checkCollectable(t_collectable)
{
	if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
	{
		if(!t_collectable.isFound){
			t_collectable.isFound = true;
			game_score += 1; 
			coinSound.play();
		}
	}
}

function checkCanyon(t_canyon)
{
	// detects whether character has walked into the bounds of the canyon
	if (gameChar_x > t_canyon.x_pos + 15 && gameChar_x < t_canyon.x_pos + t_canyon.width - 15 && gameChar_y == floorPos_y)
	{
		isPlummeting = true;
		isFallingIntoCanyon = true;
	}

	// makes character fall
	if (isPlummeting == true){
    gameChar_y += 3;
	}

	// stops character from clipping through the sides of the canyon when falling
	if (isPlummeting == true && isFallingIntoCanyon == true && gameChar_x <= t_canyon.x_pos){
		isLeft = false;
	} else if (isPlummeting == true && isFallingIntoCanyon == true && gameChar_x == t_canyon.x_pos + t_canyon.width){
		isRight = false;
	}


	if (gameChar_y > height){
		isInCanyon = true;
	}

	if (isInCanyon){
		isDead = true;
		isInCanyon = false;
	}
}

function renderFlagpole()
{
	push();
	strokeWeight(5);
	stroke(180);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);

	if (flagpole.isReached)
	{
		fill(255, 0, 50);
		strokeWeight(0);
		triangle(flagpole.x_pos, floorPos_y - 250, flagpole.x_pos, floorPos_y - 200, flagpole.x_pos + 50, floorPos_y - 225);
	}
	else
	{
		fill(255, 0, 50);
		strokeWeight(0);
		triangle(flagpole.x_pos, floorPos_y - 50, flagpole.x_pos, floorPos_y, flagpole.x_pos + 50, floorPos_y - 25);
	}
	

	pop();
}

function checkFlagpole()
{
	var d = abs(flagpole.x_pos - gameChar_x);

	if (d < 20){
		flagpole.isReached = true;
		winSound.play();
	}
}

function checkPlayerDie()
{
	if (gameChar_y > height && lives != 0) { 
		lives--; 
		loseSound.play();
		if (lives > 0) {
				startGame();
		}
}

}

function startGame(){
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;
	isSprinting = false;

	canyons = [{x_pos: 200, width: 100}, {x_pos: 600, width: 200}, {x_pos: 1000, width: 150}]

	isJumping = false;
	v_speed = 0;
	isFallingIntoCanyon = false;

	trees_x = [100, 400, 900, 1200];

	treePos_y = floorPos_y;

	clouds = {x_pos: [200, 600, 800], y_pos: [80, 100, 80], size: [40, 80, 60]};

	mountains = [{x_pos: 200, y_pos: 432, size: 50}, {x_pos: 550, y_pos: 432, size: 20}, {x_pos: 800, y_pos: 432, size: 70}];

	cameraPosX = 0;

	collectables = [{x_pos: canyons[0].x_pos + canyons[0].width/2, y_pos: floorPos_y - 90, size: 50, isFound: false}, {x_pos: canyons[1].x_pos + canyons[1].width/2, y_pos: floorPos_y - 100, size: 50, isFound: false}, {x_pos: canyons[2].x_pos + canyons[2].width/2, y_pos: floorPos_y - 100, size: 50, isFound: false}]

	game_score = 0;

	flagpole = {x_pos: 1320, isReached: false};

	isInCanyon = false;

	isDead = false;

}