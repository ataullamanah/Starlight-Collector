let player, stars, asteroids;
let score = 0;
let gameState = 'playing';

function setup() {
  createCanvas(800, 600);
  player = new Player(width / 2, height - 50);
  stars = [];
  asteroids = [];
  for (let i = 0; i < 10; i++) {
    stars.push(new Star());
  }
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  if (gameState === 'playing') {
    player.update();
    player.show();
    
    for (let star of stars) {
      star.update();
      star.show();
      if (player.hits(star)) {
        score += 10;
        star.reset();
      }
    }
    
    for (let asteroid of asteroids) {
      asteroid.update();
      asteroid.show();
      if (player.hits(asteroid)) {
        gameState = 'gameover';
      }
    }
    
    textSize(20);
    fill(255);
    text(`Score: ${score}`, 10, 30);
  } else if (gameState === 'gameover') {
    textSize(40);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
    text(`Final Score: ${score}`, width / 2, height / 2 + 50);
    textSize(20);
    text('Press R to Restart', width / 2, height / 2 + 100);
  }
}

function keyPressed() {
  if (gameState === 'gameover' && key === 'r') {
    score = 0;
    gameState = 'playing';
    player = new Player(width / 2, height - 50);
    for (let star of stars) star.reset();
    for (let asteroid of asteroids) asteroid.reset();
  }
}

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.size = 20;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) this.vel.x = -5;
    else if (keyIsDown(RIGHT_ARROW)) this.vel.x = 5;
    else this.vel.x = 0;
    
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, this.size, width - this.size);
  }
  
  show() {
    fill(0, 255, 0);
    triangle(
      this.pos.x, this.pos.y - this.size,
      this.pos.x - this.size, this.pos.y + this.size,
      this.pos.x + this.size, this.pos.y + this.size
    );
  }
  
  hits(object) {
    let d = dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y);
    return d < this.size + object.size;
  }
}

class Star {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.pos = createVector(random(width), random(-100, 0));
    this.vel = createVector(0, random(2, 5));
    this.size = 10;
  }
  
  update() {
    this.pos.add(this.vel);
    if (this.pos.y > height) this.reset();
  }
  
  show() {
    fill(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, this.size * 2);
  }
}

class Asteroid {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.pos = createVector(random(width), random(-100, 0));
    this.vel = createVector(random(-2, 2), random(3, 6));
    this.size = random(15, 30);
  }
  
  update() {
    this.pos.add(this.vel);
    if (this.pos.y > height) this.reset();
  }
  
  show() {
    fill(150);
    ellipse(this.pos.x, this.pos.y, this.size * 2);
  }
}
