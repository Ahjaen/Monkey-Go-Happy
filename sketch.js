
var monkey , monkey_running
var banana ,bananaImage
var bananaGroup
var obstacle, obstacleImage
var obstacleGroup
var score
var ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var time=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite (75,335,10,10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite (200,380,400,10);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(200);
  
  if (gameState === PLAY){
     if (keyDown("space") && monkey.y >= 325){
    monkey.velocityY = -17;
    }
  monkey.velocityY = monkey.velocityY +0.8;
  
  monkey.collide(ground);
  
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
  spawnObstacles();
  spawnBanana();
    
    score=Math.ceil(frameCount/frameRate())
    text("Survival Time: " + score,180,50)
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  } 
  
  else if (gameState === END){
    
    monkey.collide(ground);
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }

  
  drawSprites();
}


function spawnObstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,355,5,5);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale = 0.1;
    
    obstacle.lifetime = 90;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if (frameCount % 80 === 0){
    var banana = createSprite (400,20,10,10)
    banana.y = Math.round(random(150,250));
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.1;
    
    banana.lifetime = 77;
    bananaGroup.add(banana);
  }
}



