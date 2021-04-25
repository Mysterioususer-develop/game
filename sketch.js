var mario, mario_img;
var bg_img;
var ground, ground_img;
var ground2;
var CloudsGroup;
var PipesGroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score=0;
var gameover,gameover_img

function preload() {
  bg_img = loadImage("bg.png");
  mario_img = loadAnimation("mario1.png", "mario2.png");
  ground_img = loadImage("ground.png");
  clouds_img = loadImage("cloud.png");
  pipes_img = loadImage("pipes.png");
  pipes1_img = loadImage("pipes1.png");
  pipes2_img = loadImage("pipes2.png");
  pipes3_img = loadImage("pipes3.png");
  deadmario_img = loadImage("mario_dead.png");
  gameover_img = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  mario = createSprite(50, 165, 20, 20);
  mario.addAnimation("mario", mario_img);
  mario.scale = 0.25;
  ground = createSprite(300, 190, 600, 10);
  ground.addImage("ground", ground_img);
  ground.velocityX = -3;
  ground2 = createSprite(300, 170, 600, 10);
  PipesGroup = new Group();
  CloudsGroup = new Group();
  ground2.visible = false;
  gameover = createSprite(300,100,200,100);
  gameover.addImage("gameOver.png",gameover_img);
  gameover.scale=0.3;
  gameover.visible=false;

}

function draw() {
  background("skyblue");
  
text("Score: "+ score, 250, 25);  

  mario.collide(ground2);


  //console.log(mario.y);

  drawSprites();
  text(mouseX + ";" + mouseY, 20, 20);

  
  
  if (gamestate === PLAY) {
  
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyWentDown("UP_ARROW") && mario.y > 130) {
      mario.velocityY = -13;
    }
    mario.velocityY = mario.velocityY + 0.8;
    SpawnClouds();
    SpawnPipes();

    score = score + Math.round(World.frameRate/60);
    
    if (PipesGroup.isTouching(mario)) {
      gamestate = END;
      
    
    
    
    }

  } else if (gamestate === END) {
    ground.velocityX = 0;
    PipesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    mario.velocityY = 0;
    CloudsGroup.setLifetimeEach(-1);
    PipesGroup.setLifetimeEach(-1);
    gameover.visible=true;

    mario.addImage("mario_dead.png", deadmario_img);
    mario.changeImage("mario_dead.png", deadmario_img);
  
    
  
  }





}

function SpawnClouds() {

  if (frameCount % 100 === 0) {
    var clouds = createSprite(600, 30, 20, 20);
    clouds.y = random(50, 120);
    clouds.addImage("clouds.png", clouds_img);
    clouds.velocityX = -3;
    clouds.lifetime = 200;
    CloudsGroup.add(clouds);
  }

}

function SpawnPipes() {
  if (frameCount % 90 === 0) {
    var pipes = createSprite(600, 155, 20, 40);
    pipes.velocityX = -3;
    pipes.lifetime = 200;

    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        pipes.addImage("pipes.png", pipes_img);
        pipes.scale = 0.3;
        break;
      case 2:
        pipes.addImage("pipes1.png", pipes1_img);
        break;
      case 3:
        pipes.addImage("pipes2.png", pipes2_img);
        break;
      case 4:
        pipes.addImage("pipes3.png", pipes3_img);
        break;
      default:
        break;

    }
    PipesGroup.add(pipes);
  }

}