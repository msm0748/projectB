import hero from "./hero.js";
const btn = document.querySelector("button");
const canvas = document.getElementById("CANVAS_1");
const ctx = canvas.getContext("2d");
let frameIdx = 24;
const spriteFrames = [];

for (let i = 0; i < 24; i++) {
  spriteFrames.push(i);
}

// heroImg.src = "http://cfile3.uf.tistory.com/image/275A984253187A1311F1EB";

let ani;
let jump = false;
let jumpState = true;
let run = true;
ctx.fillStyle = "#222222";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let timer = 0;
let obstacleArr = [];
class Obstacle {
  constructor() {
    this.x = 450;
    this.y = 450;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function drawDynamicImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ani = requestAnimationFrame(drawDynamicImage);
  timer++;
  if (timer % 60 === 0) {
    const obstacle = new Obstacle();
    obstacleArr.push(obstacle);
  }
  obstacleArr.forEach((v, i, arr) => {
    if (v.x < 0) {
      arr.splice(i, 1);
    }
    crash(hero, v);
    v.x -= 5;
    v.draw();
  });
  //   obstacle.x--;
  const sX = Math.floor(spriteFrames[frameIdx] % 6) * 266;
  const sY = Math.floor(spriteFrames[frameIdx] / 6) * 366;
  handleJump();
  if (run === true) {
    hero.draw(ctx, sX, sY);
  } else {
    hero.draw(ctx, 3 * 266, 3 * 366);
  }
  if (frameIdx == 0) {
    frameIdx = 24;
  }
  frameIdx--;
}
function handleJump() {
  if (jump === true && jumpState === true) {
    run = false;
    hero.y -= 5;
    if (hero.y === 0) {
      // 점프 높이
      jumpState = false;
    }
  }
  if (jumpState === false) {
    if (hero.y < 250) {
      jump = false;
      hero.y += 5;
    } else if (hero.y === 250) {
      run = true;
      jumpState = true;
    }
  }
}

function crash(hero, obstacle) {
  const x = obstacle.x - (hero.x + hero.width);
  const y = obstacle.y - (hero.y + hero.height);
  if (x < 0 && y < 0) {
    cancelAnimationFrame(ani);
  }
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump = true;
  }
});
requestAnimationFrame(drawDynamicImage);

// drawDynamicImage();
