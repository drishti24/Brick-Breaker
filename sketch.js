var ball,score,paddle,colors,BRICK_W,BRICK_H,BRICK_MARGIN,edges,offsetY,brick,lives,gameState;

function setup() {
  createCanvas(400,400);
  ball = createSprite(200,225,15,15); 
  paddle = createSprite(200, 370, 100, 10);
  paddle.shapeColor = color(254, 110, 174);
  colors = [color(255, 50, 0), color(30,255,30), color(201, 150, 253),color(255,255,0)];
  BRICK_W = 50;
  BRICK_H = 25;
  BRICK_MARGIN = 4;
  offsetY = 80;
  gameState = "serve";
  score = 0;
  lives = 3;

  bricks = new Group();
  for(var r = 0; r<4; r++)
    for(var c = 0; c<6; c++) {
      brick = createSprite(65+c*(BRICK_W+BRICK_MARGIN), 80+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = colors[r];
      bricks.add(brick);
      brick.immovable = true;
    }

  ball.draw = function () { ellipse(0, 0, 15, 15) }
  fill("white");

}

function draw() {
  background("black");

  if (gameState === "serve") {
    textSize(20);
    stroke("white")
    text("Press Space to Serve", 100, 205);
  }

  textSize(20);
  text("Lives: " + lives, 310, 25);
  text("Score: "+ score, 15, 25);

  paddle.x = World.mouseX;

  edges=createEdgeSprites();

  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[0]);
  ball.bounceOff(bricks, brickHit);
  ball.bounceOff(paddle);

  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }

  if(paddle.x < 60){
    paddle.x = 60;
  }

  if(paddle.x > 340){
    paddle.x = 340;
  }
  
  if(score === 120){
    textSize(20);
    text("You Won!",160,150);
    text("Press 'R' to Restart", 125, 200);
    bricks.destroyEach();
    paddle.destroy();
    ball.destroy();
    gameState = "over";
  }

  if(ball.y > 390 ){
    lives = lives - 1;
    reset();
    gameState = "serve";
  }

  if(lives === 0){
    textSize(20);
    text("Game Over!",150,150);
    text("Press 'R' to Restart", 125, 200);
    bricks.destroyEach();
    paddle.destroy();
    ball.destroy();
    gameState = "over";
  }

  // if (lives === 0) {
  //   gameState = "over";
  //   text("Game Over!", 170, 160);
  //   text("Press 'R' to Restart", 150, 180);
  // }

  if (keyDown("r") && gameState === "over") {
    for(var r = 0; r<4; r++)
      for(var c = 0; c<6; c++) {
        brick = createSprite(65+c*(BRICK_W+BRICK_MARGIN), 80+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
        brick.shapeColor = colors[r];
        bricks.add(brick);
        brick.immovable = true;
    }
    paddle = createSprite(200, 370, 100, 10);
    paddle.shapeColor = color(0,0,255);
    ball = createSprite(200,225,15,15);
    ball.draw = function () { ellipse(0, 0, 15, 15) }
    fill("white");
    gameState = "serve";
    score = 0;
    lives = 3;
  }

  drawSprites();
}

// function mouse (){
//   ball.velocityX = 10;
//   ball.velocityY = 10;
// }

function serve() {
  ball.velocityX = 10;
  ball.velocityY = 10;
}

function reset() {
  ball.x = 200;
  ball.y = 225;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

function brickHit(ball, brick){
 brick.remove();
 score = score+5;
}
