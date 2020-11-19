var trex, trex_running;
var ground, ground_image;
var cloud_image;
var obstacle_image;
var obstacle_image2, obstacle_image3, obstacle_image4, obstacle_image5, obstacle_image6;
var invisibleGround;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ObstacleGroup;
var CloudGroup;

var trexCollided;

var gameOver, gameOver_image;
var restart, restart_image;



function preload(){
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
ground_image = loadImage("ground2.png");
cloud_image = loadImage ("cloud.png");
obstacle_image = loadImage ("obstacle1.png");
obstacle_image2 = loadImage ("obstacle2.png");
obstacle_image3 = loadImage ("obstacle3.png");
obstacle_image4 = loadImage ("obstacle4.png");
obstacle_image5 = loadImage ("obstacle5.png");
obstacle_image6 = loadImage ("obstacle6.png");
trexCollided = loadImage ("trex_collided.png");
gameOver_image = loadImage("gameOver.png");
restart_image = loadImage ("restart.png");
}

function setup() {
createCanvas(400, 400);
trex = createSprite(50, 300, 30, 30);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
  
  
ground = createSprite (50, 380, 400, 5);
  ground.x = ground.width/2;
  ground.addImage(ground_image);
  
invisibleGround = createSprite (30, 390, 400, 5);
  invisibleGround.visible = false;
  
  ObstacleGroup = new Group();
  CloudGroup = new Group();
  
gameOver = createSprite (150, 250, 10, 10);
  gameOver.addImage (gameOver_image); 
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
restart = createSprite (150, 275, 10, 10);
  restart.addImage(restart_image);
  restart.scale = 0.5;
  restart.visible = false;
  
  
}


function draw() {
  background ("white");
  
  if (gameState === PLAY){
    
  
  
if(keyDown("space") && trex.y > 320){
  trex.velocityY = -12;

}
  //add gravity
  trex.velocityY = trex.velocityY + 0.5;
    if (ground.x < 0){
    ground.x = ground.width/2;
  } 
    //SpawnClouds
  SpawnClouds();
    
    //Spawn Obstacles
  SpawnObstacles();
    
  ground.velocityX = -3;
  
    
  if (trex.isTouching(ObstacleGroup)){
    gameState = END;
  }
    
  }
  if (gameState === END){
    ObstacleGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    trex.changeAnimation("running", trexCollided);
    trex.addAnimation("running", trexCollided);
    ObstacleGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    
  }
  if (mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  

  
drawSprites();

}

function SpawnClouds () {
  if (frameCount % 60 === 0) {
  var cloud = createSprite (400, 200);
  cloud.addImage (cloud_image);
  cloud.scale = 0.5;
  cloud.velocityX = -3;
  cloud.y = random (280, 320);
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 134;
    
  CloudGroup.add(cloud);
  }
}

function SpawnObstacles () {
if(frameCount % 80 === 0){
 var obstacle = createSprite (400, 370);
 obstacle.scale = 0.5;
 obstacle.velocityX = -6;
  var rand = Math.round(random(1, 6));
 switch(rand){
   case 1:
     obstacle.addImage(obstacle_image);
    break;
    case 2:
     obstacle.addImage(obstacle_image2);
     break;
     case 3:
     obstacle.addImage(obstacle_image3);
     break;
     case 4:
     obstacle.addImage(obstacle_image4);
     break;
     case 5:
     obstacle.addImage(obstacle_image5);
     break;
     case 6:
     obstacle.addImage(obstacle_image6);
     break;
     default:
     break;
 }
  
  ObstacleGroup.add(obstacle);
}
}

function reset(){
  gameOver.visible = false;
  restart.visible = false;
  gameState = PLAY;
  ObstacleGroup.destroyEach();
  CloudGroup.destroyEach();
  trex.addAnimation("running", trex_running)
}

