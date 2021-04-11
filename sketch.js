var runner, runnerImage;
var ground, groundImage;
var invisibleGround;
var obstacleImage, obstacleGroup;
var gameOver, gameOverImage;
var restart, restartImage;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  runnerImage = loadImage('images/runner.png');
  groundImage = loadImage('images/background.jpg');
  obstacleImage = loadImage('images/obstacle.png')
  gameOverImage = loadImage('images/GameOver.png')
  restartImage = loadImage("images/Restart.png");
}

function setup() {
  createCanvas(600, 200);

  runner = createSprite(50,190,20,50);
  runner.addImage('Image', runnerImage);
  runner.scale = 0.15;
  camera.position.x = runner.x;
  camera.position.y = runner.y - 90;

  ground = createSprite(200,200,400,20);
  ground.addImage('Image', groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,192,400,10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();

  gameOver = createSprite(100,100);
  gameOver.addImage('Image', gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(100,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(255);
  
  if(gameState === PLAY){

    runner.velocityY = runner.velocityY + 0.8;
    runner.collide(invisibleGround);

    if(keyDown("space") && runner.y >= 159) {
      runner.velocityY = -12;
    }

    
    ground.velocityX = -4;
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
    spawnObstacles();

    if(obstacleGroup.isTouching(runner)){
      gameState = END;
    }
  }

  else if(gameState === END){

    runner.velocityY = 0;

    ground.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0){

    var obstacle = createSprite(600,165,10,10);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);  
    obstacle.scale = 0.1;
    obstacle.setCollider('rectangle',0,0,50,50)
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function reset(){

  obstacleGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;

  gameState = PLAY;
}